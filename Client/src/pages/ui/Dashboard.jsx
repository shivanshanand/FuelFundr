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
import { LogOut, Menu } from "lucide-react";
import AddFundsModal from "../../components/modals/AddFundsModal ";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/modals/SuccessModal ";
// If you have a fetchBadges or fetchProfile action, import them here

const sidebarTabs = [
  { key: "profile", label: "Profile" },
  { key: "campaigns", label: "Campaigns" },
  { key: "donations", label: "Contributions" },
  { key: "wallet", label: "Wallet" },
  { key: "badges", label: "Badges" },
  { key: "analytics", label: "Analytics" },
];

const Dashboard = () => {
  const [tab, setTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAdded, setLastAdded] = useState(0);
  const navigate = useNavigate();

  // Stores
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
    // ...(add fetchBadges if you have badges as separate part of walletStore)
  } = useWalletStore();

  const [modalOpen, setModalOpen] = useState(false);

  // Initial data on mount
  useEffect(() => {
    if (!campaigns.length) fetchCampaigns();
    fetchWalletBalance();
    fetchTransactions();
    // If you fetch badges or profile on mount, add here
    // fetchBadges();
    // fetchProfile();
  }, []); // only on initial mount

  // LIVE REFRESH: Fetch data every time tab changes!
  useEffect(() => {
    if (tab === "wallet") {
      fetchWalletBalance();
      fetchTransactions();
    }
    if (tab === "profile") {
      // fetchProfile && fetchProfile();
    }
    if (tab === "campaigns") {
      fetchCampaigns();
    }
    if (tab === "badges") {
      // fetchBadges && fetchBadges();
    }
    // Add more conditions if you have extra dashboard tabs
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
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 transition-colors">
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-5 left-4 z-40 bg-white/90 dark:bg-slate-900/90 border border-blue-200 dark:border-slate-800 rounded-full p-2 shadow-lg"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="w-7 h-7 text-blue-700 dark:text-green-400" />
      </button>
      {/* Sidebar - desktop */}
      <aside
        className={`hidden md:flex w-64 min-h-screen flex-col glassy shadow-2xl border-r border-blue-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 px-4 py-7 z-30`}
      >
        {/* Brand */}
        <div className="mb-10 flex items-center gap-2 select-none">
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent">
            Dashboard
          </span>
        </div>
        {/* Tabs */}
        <nav className="flex flex-col gap-2 flex-1">
          {sidebarTabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-3 rounded-xl text-left font-bold transition-all duration-150 flex items-center whitespace-nowrap 
                ${
                  tab === key
                    ? "bg-gradient-to-r from-blue-700 to-green-400 text-white shadow-md scale-105"
                    : "bg-white/60 dark:bg-slate-900/60 text-blue-800 dark:text-green-200 border border-blue-100 dark:border-slate-800 hover:bg-blue-100 dark:hover:bg-blue-800"
                }
                outline-none focus:ring-2 focus:ring-green-400`}
              aria-current={tab === key}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-8 flex flex-col gap-2">
          <button
            onClick={handlelogout}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-400 to-blue-400 text-white font-bold shadow hover:from-red-500 hover:to-blue-700 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Drawer Sidebar - mobile */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-all duration-300 ${
          sidebarOpen ? "block" : "hidden"
        } md:hidden`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 flex flex-col glassy shadow-2xl border-r border-blue-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 py-7 transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close area */}
        <button
          className="absolute top-3 right-3 p-1 text-2xl font-bold text-blue-600 dark:text-green-400"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
        >
          ×
        </button>
        {/* Brand */}
        <div className="mb-10 flex items-center gap-2 select-none">
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent">
            Dashboard
          </span>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          {sidebarTabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => {
                setTab(key);
                setSidebarOpen(false);
              }}
              className={`px-5 py-3 rounded-xl text-left font-bold transition-all duration-150 flex items-center whitespace-nowrap 
                ${
                  tab === key
                    ? "bg-gradient-to-r from-blue-700 to-green-400 text-white shadow-md scale-105"
                    : "bg-white/60 dark:bg-slate-900/60 text-blue-800 dark:text-green-200 border border-blue-100 dark:border-slate-800 hover:bg-blue-100 dark:hover:bg-blue-800"
                }
                outline-none focus:ring-2 focus:ring-green-400`}
              aria-current={tab === key}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-8 flex flex-col gap-2">
          <button
            onClick={() => {
              handlelogout();
              setSidebarOpen(false);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-400 to-blue-400 text-white font-bold shadow hover:from-red-500 hover:to-blue-700 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="mb-5">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-green-400 text-white font-bold shadow hover:from-blue-800 hover:to-green-700 transition text-base"
          >
            <svg
              className="w-5 h-5 mr-1"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M13 15l-5-5 5-5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            Back
          </button>
        </div>
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
