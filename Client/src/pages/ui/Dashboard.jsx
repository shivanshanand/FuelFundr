import { useEffect, useState } from "react";
import { useCampaignStore } from "../../store/campaignStore";
import { useWalletStore } from "../../store/walletStore";
import { useAuthStore } from "../../store/authStore";
import Profile from "../../components/dashboard/Profile";
import Campaigns from "../../components/dashboard/Campaigns";
import Donations from "../../components/dashboard/Donations";
import Wallet from "../../components/dashboard/Wallet";
import Badges from "../../components/dashboard/Badges";
import Analytics from "../../components/dashboard/Analytics";
import { LogOut, Menu, X, ArrowLeft } from "lucide-react";
import AddFundsModal from "../../components/modals/AddFundsModal ";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/modals/SuccessModal ";

const sidebarTabs = [
  { key: "profile", label: "Profile Details" },
  { key: "campaigns", label: "My Campaigns" },
  { key: "donations", label: "Contributions" },
  { key: "wallet", label: "Wallet & Funds" },
  { key: "badges", label: "Earned Badges" },
  { key: "analytics", label: "Impact Analytics" },
];

const Dashboard = () => {
  const [tab, setTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAdded, setLastAdded] = useState(0);
  const navigate = useNavigate();

  const {
    campaigns,
    fetchCampaigns,
    isLoading: loadingCampaigns,
  } = useCampaignStore();

  const {
    walletBalance,
    transactions,
    fetchWalletBalance,
    fetchTransactions,
    isLoading: loadingWallet,
    addFunds,
  } = useWalletStore();

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!campaigns.length) fetchCampaigns();
    fetchWalletBalance();
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (tab === "wallet") {
      fetchWalletBalance();
      fetchTransactions();
    }
    if (tab === "campaigns") {
      fetchCampaigns();
    }
  }, [tab]);

  const handlelogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const myCampaigns = campaigns.filter(
    (c) =>
      (typeof c.createdBy === "string" && c.createdBy === user?._id) ||
      (c.createdBy &&
        typeof c.createdBy === "object" &&
        c.createdBy._id === user?._id)
  );

  const userDonations = campaigns.flatMap((c) =>
    (c.donors || [])
      .filter((d) => d.userId === user?._id)
      .map((d) => ({
        campaign: {
          _id: c._id,
          title: c.title,
          image: c.image,
        },
        amount: d.amount,
        date: d.date || c.createdAt,
      }))
  );

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-200 select-none">
      {/* Mobile Nav Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur border-b border-slate-200/50 dark:border-white/5 py-4 px-6 flex items-center justify-between shadow-sm">
        <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white">
          FuelFundr<span className="text-indigo-500">.</span>
        </span>
        <button
          className="p-1 text-slate-700 dark:text-slate-350"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open Navigation"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-white dark:bg-[#0b0f17] border-r border-slate-200/50 dark:border-white/5 px-6 py-8">
        {/* Brand */}
        <div className="mb-10">
          <span
            onClick={() => navigate("/")}
            className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white cursor-pointer"
          >
            FuelFundr<span className="text-indigo-500">.</span>
          </span>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-1.5 flex-1">
          {sidebarTabs.map(({ key, label }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-4 py-2.5 rounded-lg text-left text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer
                  ${
                    active
                      ? "bg-slate-100 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-l-2 border-indigo-500"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-150"
                  }
                `}
                aria-current={active}
              >
                {label}
              </button>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="mt-auto pt-6">
          <button
            onClick={handlelogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-rose-500 text-slate-750 dark:text-slate-200 hover:text-rose-500 dark:hover:text-rose-450 bg-white/50 dark:bg-slate-900/50 hover:bg-rose-500/5 transition cursor-pointer text-xs font-mono font-bold uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 flex flex-col bg-white dark:bg-[#0b0f17] border-r border-slate-200 dark:border-slate-800 px-6 py-8 transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-650"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-10">
          <span
            onClick={() => {
              setSidebarOpen(false);
              navigate("/");
            }}
            className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white cursor-pointer"
          >
            FuelFundr<span className="text-indigo-500">.</span>
          </span>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {sidebarTabs.map(({ key, label }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setTab(key);
                  setSidebarOpen(false);
                }}
                className={`px-4 py-2.5 rounded-lg text-left text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer
                  ${
                    active
                      ? "bg-slate-100 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-l-2 border-indigo-500"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-150"
                  }
                `}
                aria-current={active}
              >
                {label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-6">
          <button
            onClick={() => {
              handlelogout();
              setSidebarOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-rose-500 text-slate-750 dark:text-slate-200 hover:text-rose-500 dark:hover:text-rose-450 bg-white/50 dark:bg-slate-900/50 hover:bg-rose-500/5 transition cursor-pointer text-xs font-mono font-bold uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 px-6 md:px-10 py-24 md:py-10 overflow-y-auto w-full">
        {/* Navigation / Back header action */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-indigo-500 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer shadow-sm transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
        </div>

        {/* Tab Components */}
        <div className="w-full max-w-5xl mx-auto">
          {tab === "profile" && <Profile user={user} />}
          {tab === "campaigns" && (
            <Campaigns campaigns={myCampaigns} loading={loadingCampaigns} />
          )}
          {tab === "donations" && (
            <Donations donations={userDonations} loading={loadingCampaigns} />
          )}
          {tab === "wallet" && (
            <Wallet
              balance={walletBalance}
              transactions={transactions}
              loading={loadingWallet}
              onAddFunds={() => setModalOpen(true)}
            />
          )}
          {tab === "badges" && <Badges badges={user.badges} />}
          {tab === "analytics" && (
            <Analytics
              user={user}
              campaigns={myCampaigns}
              transactions={transactions}
            />
          )}
        </div>
      </main>

      <AddFundsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddFunds={async (amount) => {
          await addFunds(amount);
          fetchWalletBalance();
          fetchTransactions();
          setLastAdded(amount);
          setShowSuccess(true);
        }}
        isLoading={loadingWallet}
      />

      <SuccessModal
        open={showSuccess}
        amount={lastAdded}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
};

export default Dashboard;
