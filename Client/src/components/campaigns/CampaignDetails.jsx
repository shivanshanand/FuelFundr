import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCampaignStore } from "../../store/campaignStore";
import BadgeModal from "../modals/BadgeModal";
import {
  Gift,
  Users,
  Calendar,
  Zap,
  Star,
  Trophy,
  User,
  LoaderCircleIcon,
} from "lucide-react";
import CampaignDetailsNavbar from "../../components/navbar/CampaignDetailsNavbar";
import DonationSuccessModal from "../modals/DonationSuccessModal";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";
import { useWalletStore } from "../../store/walletStore";
import WithdrawSuccessModal from "../modals/WithdrawSuccessModal";
import ProgressBar from "../ui/ProgressBar";
import axios from "axios";
import MinimalFooter from "../footer/MinimalFooter";

// Utility for day calc and colored avatar
function daysLeft(deadline) {
  const end = new Date(deadline);
  const now = new Date();
  const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  return diff > 0 ? `${diff} days left` : "Ended";
}
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const h = hash % 360;
  return `hsl(${h}, 80%, 60%)`;
}

const API_URL = import.meta.env.VITE_API_URL;

const CampaignDetails = () => {
  const { id } = useParams();
  const {
    fetchCampaignById,
    currentCampaign,
    donateToCampaign,
    guestDonateToCampaign,
    withdrawFromCampaign,
    isLoading,
    error,
    badgeModalVisible,
    unlockedBadges,
    resetBadgeModal,
  } = useCampaignStore();

  const {
    title,
    description,
    targetAmount,
    amountRaised,
    amountWithdrawn,
    deadline,
    createdBy,
    image,
    category,
    donors = [],
  } = currentCampaign;

  const { user: currUser } = useAuthStore();
  const [amount, setAmount] = useState("");
  const [showDonationSuccess, setShowDonationSuccess] = useState(false);
  const [donatedAmount, setDonatedAmount] = useState(null);
  const [donationLoading, setDonationLoading] = useState(false);
  const [tab, setTab] = useState("story");
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false);
  const [withdrawnAmount, setWithdrawnAmount] = useState(null);
  const { fetchWalletBalance } = useWalletStore();

  const amountAvailable = (amountRaised || 0) - (amountWithdrawn || 0);
  const campaignCount = createdBy?.campaignCount ?? 1;

  const [creatorTotalDonated, setCreatorTotalDonated] = useState(0);

  const isCampaignEnded =
    new Date(deadline) < new Date() ||
    currentCampaign.status === "fulfilled" ||
    currentCampaign.status === "closed";

  useEffect(() => {
    if (createdBy?._id) {
      axios
        .get(`${API_URL}/wallet/total-donated?userId=${createdBy._id}`)
        .then((res) => setCreatorTotalDonated(res.data.totalDonated || 0))
        .catch(() => setCreatorTotalDonated(0));
    }
  }, [createdBy?._id]);

  useEffect(() => {
    fetchCampaignById(id);
    // eslint-disable-next-line
  }, [id]);

  const handleDonate = async (e) => {
    e.preventDefault();

    if (isCampaignEnded) {
      toast.error("This campaign has ended.");
      return;
    }

    if (amount > 0) {
      setDonationLoading(true);

      try {
        if (currUser) {
          await donateToCampaign(id, Number(amount));
        } else {
          // Guest donation flow
          await guestDonateToCampaign(id, Number(amount));
        }

        setAmount("");
        setDonationLoading(false);
        setDonatedAmount(amount);
        setShowDonationSuccess(true);

        setTimeout(async () => {
          await fetchCampaignById(id);
          setShowDonationSuccess(false);
          setDonatedAmount(null);
        }, 1700);
      } catch (err) {
        setDonationLoading(false);
        toast.error("Donation failed! " + (err.message || ""));
      }
    } else {
      toast.error("Enter valid amount!!");
    }
  };

  const handleCloseDonationSuccess = async () => {
    setShowDonationSuccess(false);
    setDonatedAmount(null);
    await fetchCampaignById(id);
  };

  const handleWithdraw = async () => {
    if (amountAvailable <= 0) {
      toast.error("No funds to withdraw!");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Enter valid amount to withdraw!");
      return;
    }
    if (Number(amount) > amountAvailable) {
      toast.error("Cannot withdraw more than available funds!");
      return;
    }
    setWithdrawLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      await withdrawFromCampaign(id, Number(amount));
      setAmount("");
      await fetchWalletBalance();
      setWithdrawLoading(false);
      setWithdrawnAmount(amount);
      setShowWithdrawSuccess(true);
    } catch (err) {
      setWithdrawLoading(false);
      toast.error("Withdrawal failed. Try again.");
    }
  };

  const handleCloseWithdrawSuccess = async () => {
    setShowWithdrawSuccess(false);
    setWithdrawnAmount(null);
    await fetchCampaignById(id);
  };

  if (isLoading || !currentCampaign)
    return (
      <div className="flex w-full flex-col justify-center items-center min-h-[400px] gap-3">
        <div className="w-8 h-8 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest animate-pulse">
          Loading Campaign details...
        </span>
      </div>
    );
  if (error)
    return (
      <div className="flex w-full justify-center items-center min-h-[400px]">
        <span className="text-rose-500 text-xs font-mono font-bold uppercase tracking-widest">
          Error loading campaign details: {error}
        </span>
      </div>
    );

  const percent =
    targetAmount > 0
      ? Math.min(100, Math.round((amountRaised / targetAmount) * 100))
      : 0;
  const ownerId = typeof createdBy === "object" ? createdBy._id : createdBy;
  const isOwner =
    ownerId && currUser?._id && String(currUser._id) === String(ownerId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <CampaignDetailsNavbar />
      <div className="flex-grow max-w-7xl w-full mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Column: Image, Story, Creator Info */}
        <main className="flex-1 min-w-0 w-full">
          {/* Category Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10 uppercase">
              {category || "Campaign"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tighter mb-4 leading-tight">
            {title}
          </h1>

          {/* Owner details */}
          <div className="flex items-center gap-4 mb-8 text-slate-500 dark:text-slate-400 text-sm">
            <span className="flex items-center gap-2">
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-sm"
                style={{
                  background: stringToColor(createdBy?.name || "Unknown"),
                  minWidth: "1.75rem",
                }}
              >
                {(createdBy?.name?.[0] || "U").toUpperCase()}
              </span>
              <span className="text-slate-400 font-medium">by</span>
              <span className="text-slate-900 dark:text-slate-200 font-semibold">
                {createdBy?.name || "Unknown"}
              </span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
            <span className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {daysLeft(deadline)}
            </span>
          </div>

          {/* Campaign Cover Image */}
          {image && (
            <img
              src={image}
              alt={title}
              width={900}
              height={320}
              className="w-full max-h-[360px] object-cover rounded-2xl border border-slate-200 dark:border-white/5 mb-8 shadow-sm"
            />
          )}

          {/* Minimal tab bar */}
          <div className="flex w-full max-w-sm mb-6 border-b border-slate-200 dark:border-white/5">
            <button
              onClick={() => setTab("story")}
              className={`pb-3 text-sm font-bold transition-all relative cursor-pointer mr-6
                ${
                  tab === "story"
                    ? "text-indigo-500 font-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-indigo-500"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
            >
              Story Description
            </button>
            <button
              onClick={() => setTab("creator")}
              className={`pb-3 text-sm font-bold transition-all relative cursor-pointer
                ${
                  tab === "creator"
                    ? "text-indigo-500 font-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-indigo-500"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
            >
              Creator Information
            </button>
          </div>

          {/* Tab Content Box */}
          <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-8 mb-8 border border-slate-200 dark:border-white/5 shadow-sm">
            {tab === "story" && (
              <div>
                <p className="text-slate-700 dark:text-slate-350 text-base leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            )}
            {tab === "creator" && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-sm"
                    style={{
                      background: stringToColor(createdBy?.name || "Unknown"),
                      minWidth: "3.5rem",
                    }}
                  >
                    {(createdBy?.name?.[0] || "U").toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-0.5">
                      {createdBy?.name || "Unknown"}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      {createdBy?.bio || "No biography added by the creator."}
                    </p>
                  </div>
                </div>

                {/* Creator Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/10 rounded-xl p-5 flex flex-col items-center">
                    <span className="font-mono font-bold text-2xl text-slate-800 dark:text-white mb-0.5">
                      {campaignCount}
                    </span>
                    <span className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">
                      {campaignCount === 1 ? "Campaign Launched" : "Campaigns Launched"}
                    </span>
                  </div>
                  <div className="border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/10 rounded-xl p-5 flex flex-col items-center">
                    <span className="font-mono font-bold text-2xl text-slate-800 dark:text-white mb-0.5">
                      ₹{creatorTotalDonated.toLocaleString() || "0"}
                    </span>
                    <span className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">
                      Total Donated
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <BadgeModal
            show={badgeModalVisible}
            badges={unlockedBadges}
            onClose={() => {
              resetBadgeModal();
            }}
          />
        </main>

        {/* Right Sidebar: Statistics, Checkout form, Withdraw panel */}
        <aside className="w-full lg:w-[380px] shrink-0 bg-white dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-white/5 shadow-sm flex flex-col gap-6">
          {/* Progress Section */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-3xl font-mono font-black text-slate-900 dark:text-white">
                ₹{amountRaised?.toLocaleString() || 0}
              </span>
              <span className="text-sm font-mono font-bold text-indigo-500 dark:text-indigo-400">
                {percent}%
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              raised of ₹{targetAmount?.toLocaleString()} goal
            </p>
            <ProgressBar
              raised={amountRaised || 0}
              target={targetAmount || 1}
            />

            {currentCampaign.status === "open" && (
              <div className="grid grid-cols-2 gap-4 mt-6 border-t border-slate-100 dark:border-slate-800/40 pt-4 text-center">
                <div>
                  <span className="font-mono font-bold text-lg text-slate-800 dark:text-slate-200 block leading-none mb-1">
                    {donors.length}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">backers</span>
                </div>
                <div>
                  <span className="font-mono font-bold text-lg text-slate-800 dark:text-slate-200 block leading-none mb-1">
                    {Math.max(
                      0,
                      Math.ceil((new Date(deadline) - new Date()) / 86400000),
                    )}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">days to go</span>
                </div>
              </div>
            )}
          </div>

          {(currentCampaign.status === "fulfilled" ||
            currentCampaign.status === "closed") && (
            <div className="w-full rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold py-3 uppercase tracking-wider">
              {currentCampaign.status === "fulfilled" ? "✓ Goal Reached" : "Closed"}
            </div>
          )}

          {isCampaignEnded ? (
            <div className="text-center">
              <button
                className="w-full py-3 rounded-xl font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-sm cursor-not-allowed uppercase tracking-wider"
                disabled
                type="button"
              >
                Campaign Ended
              </button>
              <p className="text-[10px] text-slate-400 mt-2 font-mono">
                This campaign closed on {new Date(deadline).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {isOwner ? (
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Owner Withdraw Panel</span>
                  <input
                    type="number"
                    placeholder={`Withdraw Amount (Max: ₹${amountAvailable})`}
                    value={amount}
                    min={1}
                    max={amountAvailable}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition shadow-sm mb-1"
                  />
                  <button
                    onClick={handleWithdraw}
                    disabled={withdrawLoading}
                    className="w-full py-3 rounded-xl font-bold text-white text-sm bg-rose-600 hover:bg-rose-700 transition duration-200 shadow cursor-pointer flex justify-center items-center"
                    type="button"
                  >
                    {withdrawLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      "Withdraw Funds"
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {/* Preset donation amounts */}
                  <div className="flex gap-2">
                    {[100, 500, 1000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => !isCampaignEnded && setAmount(amt)}
                        disabled={isCampaignEnded}
                        className="flex-1 py-1.5 text-xs font-mono font-bold rounded-lg border border-slate-200 dark:border-white/10 hover:border-indigo-500 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 transition-colors shadow-sm cursor-pointer"
                        type="button"
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>

                  {/* Manual donation input */}
                  <input
                    type="number"
                    placeholder="Enter Custom Donation Amount"
                    value={amount}
                    min={1}
                    disabled={isCampaignEnded}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition shadow-sm"
                  />

                  {/* Back campaign CTA */}
                  <button
                    onClick={handleDonate}
                    disabled={donationLoading || isCampaignEnded}
                    className="w-full py-3 rounded-xl font-bold text-white text-sm bg-indigo-600 hover:bg-indigo-700 transition duration-200 shadow shadow-indigo-600/10 cursor-pointer flex justify-center items-center gap-1.5"
                    type="button"
                  >
                    {donationLoading ? (
                      <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                    ) : (
                      <Gift className="w-4 h-4" />
                    )}
                    {donationLoading ? "Processing..." : "Back This Campaign"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Backer Rewards Info */}
          <div className="rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-indigo-500" />
              <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                Backer Rewards
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-3">
              Earn XP and unlock achievements by backing this project!
            </p>
            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 text-[10px] font-mono font-bold">
              <span className="flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-500" /> +50 XP
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-indigo-400" /> Supporter Badge
              </span>
            </div>
          </div>
        </aside>
      </div>
      <DonationSuccessModal
        show={showDonationSuccess}
        amount={donatedAmount}
        campaignTitle={title}
        onClose={handleCloseDonationSuccess}
      />
      <WithdrawSuccessModal
        show={showWithdrawSuccess}
        amount={withdrawnAmount}
        onClose={handleCloseWithdrawSuccess}
      />
      <MinimalFooter />
    </div>
  );
};

export default CampaignDetails;
