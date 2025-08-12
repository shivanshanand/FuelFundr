import { useEffect, useState } from "react";
import HomeHero from "../../components/home/HomeHero";
import StatsBar from "../../components/home/StatsBar";
import StepsSection from "../../components/home/StepsSection";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import FAQSection from "../../components/home/FAQSection";
import ReviewsSection from "../../components/home/ReviewsSection";
import Footer from "../../components/footer/Footer";
import HomeNavbar from "../../components/navbar/HomeNavbar";

const API_URL = import.meta.env.VITE_API_URL; // Must match backend setup

const Home = () => {
  const [stats, setStats] = useState([
    // fallback initial loading state
    {
      label: "Total Raised",
      value: 0,
      prefix: "₹",
      suffix: "+",
    },
    {
      label: "Active Users",
      value: 0,
      suffix: "+",
    },
    {
      label: "Campaigns Funded",
      value: 0,
      suffix: "+",
    },
    {
      label: "Instant Payouts",
      value: 2,
      suffix: " min",
    },
  ]);

  useEffect(() => {
    fetch(`${API_URL}/stats/overview`)
      .then((res) => res.json())
      .then((data) => {
        setStats([
          {
            label: "Total Raised",
            value: data.totalRaised,
            prefix: "₹",
            suffix: "+",
          },
          {
            label: "Active Users",
            value: data.userCount,
            suffix: "+",
          },
          {
            label: "Campaigns Funded",
            value: data.campaignCount,
            suffix: "+",
          },
          {
            label: "Instant Payouts",
            value: data.instantPayout || 2,
            suffix: " min",
          },
        ]);
      });
  }, []);

  return (
    <>
      <HomeNavbar />
      <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-100 via-green-100 to-white dark:from-slate-900 dark:via-blue-950 dark:to-green-950 transition-colors">
        <HomeHero />
        <StatsBar stats={stats} />
        <StepsSection />
        <WhyChooseUs />
        <FAQSection />
        <ReviewsSection />
        <Footer />
      </div>
    </>
  );
};
export default Home;
