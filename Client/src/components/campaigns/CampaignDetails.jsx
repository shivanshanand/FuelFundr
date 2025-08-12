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
      <div className="flex w-full justify-center items-center min-h-[400px]">
        <LoaderCircleIcon className="w-16 h-16 animate-spin text-blue-700 dark:text-green-300" />
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  const percent =
    targetAmount > 0
      ? Math.min(100, Math.round((amountRaised / targetAmount) * 100))
      : 0;
  const ownerId = typeof createdBy === "object" ? createdBy._id : createdBy;
  const isOwner =
    ownerId && currUser?._id && String(currUser._id) === String(ownerId);

  return (
    <>
      <CampaignDetailsNavbar />
      <div className="max-w-8xl bg-slate-900 mx-auto px-3 py-4 flex flex-col md:flex-row gap-8 items-start">
        {/* Left: Campaign Story and Info */}
        <div className="flex-1 min-w-0 md:max-w-[900px] ml-10">
          {/* ---Category badge row--- */}
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-blue-700 text-white rounded-lg text-xs font-semibold">
              Startup
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold mb-1 text-blue-900 dark:text-green-200">
            {title}
          </h1>
          <div className="flex items-center gap-4 mt-4 mb-6 text-gray-500 dark:text-gray-300 text-sm">
            <span className="flex items-center gap-2">
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white text-base shadow"
                style={{
                  background: stringToColor(createdBy?.name || "Unknown"),
                  minWidth: "1.75rem",
                }}
              >
                {(createdBy?.name?.[0] || "U").toUpperCase()}
              </span>
              <span className="text-gray-400 font-medium">by</span>
              <span className="text-blue-700 dark:text-blue-200 font-medium">
                {createdBy?.name || "Unknown"}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {daysLeft(deadline)}
            </span>
          </div>
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full max-h-80 object-cover rounded-xl border border-blue-100 dark:border-slate-800 mb-3 shadow-md"
            />
          )}
          <div className="flex w-full mt-7 max-w-xs mx-auto mb-7 rounded-xl overflow-hidden bg-gradient-to-r from-slate-100 via-blue-50 to-blue-200 dark:from-slate-900 dark:via-blue-900 dark:to-blue-950 border border-blue-200 dark:border-slate-800 shadow font-semibold">
            <button
              onClick={() => setTab("story")}
              className={`flex-1 py-2 text-center text-base hover:cursor-pointer transition-all
                ${
                  tab === "story"
                    ? "bg-blue-700/90 dark:bg-green-700/60 text-white shadow font-bold"
                    : "bg-transparent text-gray-500 dark:text-gray-400 hover:text-blue-800"
                }`}
              style={{
                borderRight: "1px solid #b8cffb",
              }}
            >
              Story
            </button>
            <button
              onClick={() => setTab("creator")}
              className={`flex-1 py-2 text-center text-base hover:cursor-pointer transition-all
                ${
                  tab === "creator"
                    ? "bg-blue-700/90 dark:bg-green-700/60 text-white shadow font-bold"
                    : "bg-transparent text-gray-500 dark:text-gray-400 hover:text-blue-800"
                }`}
            >
              Creator
            </button>
          </div>
          <div className="border border-blue-100 dark:border-slate-800 rounded-xl bg-white/80 dark:bg-slate-900/80 p-6 shadow">
            {tab === "story" && (
              <div>
                <div className="text-base text-gray-700 dark:text-gray-200 whitespace-pre-line font-medium">
                  {description}
                </div>
              </div>
            )}
            {tab === "creator" && (
              <div>
                {/* Profile row: Avatar + Name + Bio */}
                <div className="flex items-center gap-6 mb-2">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-3xl text-white shadow"
                    style={{
                      background: stringToColor(createdBy?.name || "Unknown"),
                      minWidth: "4rem",
                    }}
                  >
                    {(createdBy?.name?.[0] || "U").toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-blue-900 dark:text-green-200 mb-0.5">
                      {createdBy?.name || "Unknown"}
                    </div>
                    <div className="text-gray-500 dark:text-gray-300 text-base max-w-lg">
                      {createdBy?.bio || "No bio added by creator!!"}
                    </div>
                  </div>
                </div>

                {/* Stats: Campaigns Started & Total Donated */}
                <div className="grid grid-cols-2 gap-5 mt-6">
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl py-6 flex flex-col items-center justify-center shadow">
                    <span className="text-blue-700 dark:text-green-200 font-extrabold text-3xl mb-0.5">
                      {campaignCount}
                    </span>
                    <span className="text-gray-500 dark:text-gray-200 font-medium text-base">
                      {campaignCount === 1
                        ? "Campaign Started"
                        : "Campaigns Started"}
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-blue-800 rounded-xl py-6 flex flex-col items-center justify-center shadow">
                    <span className="text-green-700 dark:text-green-200 font-extrabold text-3xl mb-0.5">
                      ₹{creatorTotalDonated.toLocaleString() || "0"}
                    </span>
                    <span className="text-gray-500 dark:text-gray-200 font-medium text-base">
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
        </div>

        {/* Right: Stats / Donate / Withdraw */}
        <aside className="md:w-[440px] w-full flex-shrink-0 m-4 bg-white/80 dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 rounded-2xl p-7 shadow-lg flex flex-col gap-4">
          {/* Stats Section */}
          <div>
            <div className="flex items-start justify-between">
              <div className="text-3xl font-extrabold text-green-500 leading-tight mb-1">
                ₹{amountRaised?.toLocaleString() || 0}
              </div>
              <div className="text-xl font-semibold text-blue-900 dark:text-green-300">
                {percent}%
              </div>
            </div>
            <div className="text-[.95rem] font-medium text-gray-500 dark:text-gray-300 mb-1">
              raised of ₹{targetAmount?.toLocaleString()} goal
            </div>
            <ProgressBar
              raised={amountRaised || 0}
              target={targetAmount || 1}
            />
            {currentCampaign.status === "open" && (
              <div className="flex items-center justify-evenly mt-4 mb-1">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-blue-700 dark:text-green-300 flex items-center gap-1">
                    {donors.length}
                  </span>
                  <span className="text-base text-gray-500 dark:text-gray-300 font-medium">
                    backers
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-green-500 flex items-center gap-1">
                    {Math.max(
                      0,
                      Math.ceil((new Date(deadline) - new Date()) / 86400000)
                    )}
                  </span>
                  <span className="text-base text-gray-500 dark:text-gray-300 font-medium">
                    days to go
                  </span>
                </div>
              </div>
            )}
          </div>

          {(currentCampaign.status === "fulfilled" ||
            currentCampaign.status === "closed") && (
            <div className="w-full mb-3 rounded bg-green-600/90 text-center text-white text-lg font-bold py-3 shadow">
              Campaign{" "}
              {currentCampaign.status === "fulfilled"
                ? "Goal Reached!"
                : "Closed"}
            </div>
          )}

          {currentCampaign.status === "fulfilled" ||
          currentCampaign.status === "closed" ? (
            <button
              className="w-full py-3 mt-1 rounded-xl font-semibold text-white text-lg bg-gray-400 cursor-not-allowed"
              disabled
              type="button"
            >
              Funding Complete
            </button>
          ) : (
            <>
              {isOwner ? (
                <>
                  <input
                    type="number"
                    placeholder={`Enter amount (Max: ₹${amountAvailable})`}
                    value={amount}
                    min={1}
                    max={amountAvailable}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`flex-1 px-3 py-2 text-base rounded-xl bg-blue-100/80 dark:bg-slate-900 text-blue-900 dark:text-white border border-blue-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-green-300 mb-2 shadow`}
                  />
                  <button
                    onClick={handleWithdraw}
                    disabled={withdrawLoading}
                    className={`w-full py-3 hover:cursor-pointer rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 hover:from-pink-500 hover:to-yellow-400 shadow tracking-wide transition-all ${
                      withdrawLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    type="button"
                  >
                    {withdrawLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <LoaderCircleIcon className="w-5 h-5 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      "Withdraw"
                    )}
                  </button>
                </>
              ) : (
                <>
                  <div className="flex gap-2 mt-4 mb-2">
                    {[100, 500, 1000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt)}
                        className="flex-1 py-1 text-md font-bold rounded-xl bg-blue-100/70 dark:bg-slate-900 text-blue-900 dark:text-white border border-blue-200 dark:border-slate-700 hover:bg-blue-200 dark:hover:bg-slate-800 transition shadow"
                        type="button"
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    min={1}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 px-3 py-2 text-base rounded-xl bg-blue-100/70 dark:bg-slate-900 text-blue-900 dark:text-white border border-blue-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-green-300 shadow"
                  />
                  <button
                    onClick={handleDonate}
                    disabled={donationLoading}
                    className={`w-full py-3 mt-1 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-green-400 via-blue-400 to-blue-700 hover:from-green-500 hover:to-blue-800 shadow tracking-wide transition-all ${
                      donationLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    type="button"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {donationLoading ? (
                        <LoaderCircleIcon className="w-5 h-5 animate-spin" />
                      ) : (
                        <Gift className="w-5 h-5" />
                      )}
                      {donationLoading ? "Processing..." : "Back This Campaign"}
                    </span>
                  </button>
                </>
              )}
            </>
          )}

          {/* Rewards Section */}
          <div className="rounded-xl bg-gradient-to-r from-blue-50/40 via-blue-100/50 to-green-50/50 dark:from-slate-900/80 dark:via-blue-900/80 dark:to-green-900/80 border border-blue-100 dark:border-slate-800 p-4 mt-2">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-green-700 dark:text-yellow-200 text-base">
                Backer Rewards
              </span>
            </div>
            <div className="text-blue-900 dark:text-green-100 text-[0.98rem] mb-2">
              Earn XP and unlock achievements by backing this project!
            </div>
            <div className="flex items-center gap-4 text-yellow-500 text-base">
              <span className="flex items-center gap-1">
                <Trophy className="w-5 h-5" /> +50 XP
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-5 h-5 text-blue-200" /> Supporter Badge
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
    </>
  );
};

export default CampaignDetails;
