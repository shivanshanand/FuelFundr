import { useEffect, useState } from "react";
import { useCampaignStore } from "../../store/campaignStore";
import CampaignCard from "../../components/campaigns/CampaignCard";
import { ArrowLeft, Search } from "lucide-react";
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
    // eslint-disable-next-line
  }, []);

  // after filteredCampaigns
  const totalPages = Math.ceil(filteredCampaigns.length / CAMPAIGNS_PER_PAGE);

  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * CAMPAIGNS_PER_PAGE,
    currentPage * CAMPAIGNS_PER_PAGE
  );

  // Reset page when search/category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 transition-colors duration-300">
        <ListCampaignNavbar />
        <div className="flex-1 mb-[100px]">
          {/* Back Button */}
          <div className="flex w-full">
            <div className="pt-5 px-2 sm:pl-6">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:cursor-pointer bg-gradient-to-r from-blue-700 to-green-400 text-white font-bold shadow hover:from-blue-800 hover:to-green-700 transition text-sm md:text-base"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            </div>
          </div>

          {/* Hero Section */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto py-10 md:py-12 px-3 sm:px-8 mb-10 mt-5 rounded-2xl shadow bg-white/95 dark:bg-slate-900/85 border border-blue-200 dark:border-slate-800">
            {/* Left: Headline + CTAs */}
            <div className="flex-1 flex flex-col items-start gap-4 pt-7 lg:pt-0">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent drop-shadow tracking-tight mb-2">
                Explore Campaigns.
                <br />
                Support a Dream.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-blue-800 dark:text-green-300 mb-4">
                Browse and support student projects from across India. Want to
                make an impact? <b>Start your own campaign now!</b>
              </p>
              <button
                onClick={() => (window.location.href = "/campaigns/create")}
                className="inline-block mt-2 px-7 py-3 rounded-2xl hover:cursor-pointer bg-gradient-to-r from-green-400 to-blue-600 text-white font-bold text-lg shadow hover:from-green-500 hover:to-blue-700 transition"
              >
                + Start a Campaign
              </button>
            </div>
            {/* Right: Image/Animation */}
            <div className="flex-1 flex justify-center items-center mb-8 lg:mb-0">
              <img
                src={TeamGoalsGif}
                alt="Teamwork for growth"
                className="max-h-40 w-auto sm:max-h-64 md:max-h-96 lg:max-h-[26rem] rounded-2xl shadow-xl animate-float"
                draggable={false}
              />
            </div>
          </div>
          {/* Search + Category Bar */}
          <div className="flex flex-col items-center gap-5 mb-10 px-2">
            <div className="w-full max-w-xl flex items-center shadow-lg rounded-full px-4 py-2.5 bg-white/90 dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800">
              <Search className="w-6 h-6 text-blue-700 dark:text-green-400 mr-2 opacity-80" />
              <input
                type="text"
                placeholder="Search campaigns by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-base text-blue-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div className="w-full max-w-full mx-auto mt-5 mb-3 px-0 flex justify-center">
              <div className="flex items-center gap-x-3 px-1 py-2 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-blue-200 scrollbar-thumb-rounded scrollbar-track-blue-50">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`
          inline-flex items-center gap-2
          px-6 py-2 md:px-8 md:py-3
          rounded-full font-bold transition
          text-sm md:text-base
          shadow-md border-2
          ${
            selectedCategory === cat
              ? "bg-gradient-to-r from-blue-700 to-green-400 text-white border-blue-500 shadow-xl scale-105"
              : "bg-white/90 dark:bg-slate-900/80 text-blue-800 dark:text-green-200 border-blue-100 dark:border-slate-700 hover:bg-blue-100 dark:hover:bg-blue-800"
          }
          outline-none focus:ring-2 focus:ring-green-300
        `}
                    aria-pressed={selectedCategory === cat}
                    style={{ minWidth: 100 }}
                  >
                    <span className="text-xl md:text-2xl">{emojis[cat]}</span>
                    <span className="tracking-wide">{cat}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Campaign Cards Grid */}
          <div className="max-w-7xl mx-auto px-2">
            {isLoading ? (
              <div className="min-h-[350px] flex items-center justify-center mt-8">
                <span className="text-blue-700 dark:text-green-400 font-semibold animate-pulse text-2xl">
                  Loading campaigns...
                </span>
              </div>
            ) : error ? (
              <div className="min-h-[350px] flex items-center justify-center mt-8">
                <span className="text-red-500 dark:text-red-300 text-lg font-bold">
                  {error}
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-7 gap-y-12 sm:gap-x-10 sm:gap-y-14">
                {filteredCampaigns.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 sm:py-24">
                    <span className="text-[38px] sm:text-[50px] mb-3 animate-bounce">
                      😢
                    </span>
                    <p className="text-gray-500 dark:text-gray-200 text-lg sm:text-xl text-center">
                      No campaigns found.
                      <br />
                      Try a different search or category!
                    </p>
                  </div>
                ) : (
                  paginatedCampaigns.map((c) => (
                    <CampaignCard key={c._id} c={c} />
                  ))
                )}
              </div>
            )}
          </div>

          {/* pagination logic */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 my-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                    : "bg-blue-200 dark:bg-blue-800 hover:bg-blue-400 dark:hover:bg-blue-600 text-blue-900 dark:text-green-200"
                }`}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  className={`px-3 py-1 mx-1.5 rounded-full font-semibold
          ${
            currentPage === idx + 1
              ? "bg-blue-700 text-white border border-blue-600 scale-110"
              : "bg-white dark:bg-slate-800 text-blue-700 dark:text-green-200 border border-blue-200 dark:border-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900"
          }`}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                    : "bg-blue-200 dark:bg-blue-800 hover:bg-blue-400 dark:hover:bg-blue-600 text-blue-900 dark:text-green-200"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
        <MinimalFooter />
      </div>
    </>
  );
};

export default CampaignList;
