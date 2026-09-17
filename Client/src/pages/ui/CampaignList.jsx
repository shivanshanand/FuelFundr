import { useEffect, useState } from "react";
import { useCampaignStore } from "../../store/campaignStore";
import CampaignCard from "../../components/campaigns/CampaignCard";
import { ArrowLeft, Search, Sparkles } from "lucide-react";
import TeamGoalsGif from "../../../assets/Team_goals.png";
import ListCampaignNavbar from "../../components/navbar/ListCampaignNavbar";
import { useNavigate } from "react-router-dom";
import MinimalFooter from "../../components/footer/MinimalFooter";

const emojis = {
  All: "✨",
  Startup: "🚀",
  Hackathon: "👾",
  Project: "🌱",
  "Social Cause": "🤝",
  Creative: "💡",
};

const CampaignList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const CAMPAIGNS_PER_PAGE = 12;

  const { campaigns, fetchCampaigns, isLoading, error } = useCampaignStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const categories = Object.keys(emojis);

  const filteredCampaigns =
    campaigns
      ?.filter((c) =>
        selectedCategory === "All" ? true : c.category === selectedCategory
      )
      .filter((c) =>
        c.title.toLowerCase().includes(search.trim().toLowerCase())
      ) ?? [];

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const totalPages = Math.ceil(filteredCampaigns.length / CAMPAIGNS_PER_PAGE);

  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * CAMPAIGNS_PER_PAGE,
    currentPage * CAMPAIGNS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200 select-none">
      <ListCampaignNavbar />
      
      <main className="flex-grow max-w-5xl w-full mx-auto px-6 py-8">
        {/* Back navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-indigo-500 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer shadow-sm transition-all duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>

        {/* Hero Section Banner */}
        <div className="yc-card p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 mb-10 mt-2 shadow-sm">
          <div className="flex-1 flex flex-col items-start gap-3">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-955 dark:text-white tracking-tighter leading-tight">
              Explore Campaigns
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-md mb-3">
              Browse student projects, hackathon ideas, and startup goals from across college networks. Back a campaign to support the community.
            </p>
            <button
              onClick={() => navigate("/campaigns/create")}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Campaign</span>
            </button>
          </div>
          
          <div className="flex-1 flex justify-center items-center shrink-0">
            <img
              src={TeamGoalsGif}
              alt="Explore Campaigns"
              width={260}
              height={190}
              className="max-h-36 w-auto object-contain animate-float"
              draggable={false}
            />
          </div>
        </div>

        {/* Search & Categories Bar */}
        <div className="flex flex-col gap-6 mb-10">
          {/* Search box */}
          <div className="w-full max-w-md mx-auto flex items-center rounded-lg px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm focus-within:border-indigo-500 transition-colors">
            <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-650"
            />
          </div>

          {/* Categories slider */}
          <div className="w-full overflow-x-auto pb-2 flex justify-center">
            <div className="flex items-center gap-3">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`
                      inline-flex items-center gap-1.5
                      px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition cursor-pointer
                      ${
                        active
                          ? "bg-slate-100 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border border-indigo-500/50 shadow-sm scale-105"
                          : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-indigo-500"
                      }
                    `}
                    aria-pressed={active}
                  >
                    <span>{emojis[cat]}</span>
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Campaign Cards Grid */}
        <div className="w-full">
          {isLoading ? (
            <div className="min-h-[260px] flex flex-col items-center justify-center gap-3">
              <div className="w-7 h-7 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
              <span className="text-xs font-mono text-slate-450 dark:text-slate-500 uppercase tracking-widest animate-pulse">
                Fetching campaigns...
              </span>
            </div>
          ) : error ? (
            <div className="min-h-[260px] flex items-center justify-center">
              <span className="text-rose-500 text-xs font-mono font-bold uppercase tracking-widest">
                Error loading campaigns: {error}
              </span>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <span className="text-3xl mb-3">😢</span>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                      No Campaigns Found
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                      Try updating your search text filter or selected categories.
                    </p>
                  </div>
                ) : (
                  paginatedCampaigns.map((c) => (
                    <CampaignCard key={c._id} c={c} />
                  ))
                )}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-12 pt-6 border-t border-slate-200/50 dark:border-white/5">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg border transition duration-150 cursor-pointer ${
                      currentPage === 1
                        ? "text-slate-300 dark:text-slate-700 border-slate-100 dark:border-slate-850 cursor-not-allowed bg-transparent"
                        : "text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-indigo-500 bg-white dark:bg-slate-900"
                    }`}
                  >
                    Prev
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, idx) => {
                      const page = idx + 1;
                      const active = currentPage === page;
                      return (
                        <button
                          key={page}
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-[10px] transition cursor-pointer
                            ${
                              active
                                ? "bg-slate-100 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border border-indigo-500/50 shadow-sm"
                                : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-indigo-500"
                            }
                          `}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg border transition duration-150 cursor-pointer ${
                      currentPage === totalPages
                        ? "text-slate-300 dark:text-slate-700 border-slate-100 dark:border-slate-850 cursor-not-allowed bg-transparent"
                        : "text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-indigo-500 bg-white dark:bg-slate-900"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <MinimalFooter />
    </div>
  );
};

export default CampaignList;
