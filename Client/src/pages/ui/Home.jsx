import { useEffect, useState } from "react";
import HomeHero from "../../components/home/HomeHero";
import StatsBar from "../../components/home/StatsBar";
import StepsSection from "../../components/home/StepsSection";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import FAQSection from "../../components/home/FAQSection";
import ReviewsSection from "../../components/home/ReviewsSection";
import Footer from "../../components/footer/Footer";
import HomeNavbar from "../../components/navbar/HomeNavbar";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [stats, setStats] = useState([
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
            value: data.totalRaised || 0,
            prefix: "₹",
            suffix: "+",
          },
          {
            label: "Active Users",
            value: data.userCount || 0,
            suffix: "+",
          },
          {
            label: "Campaigns Funded",
            value: data.campaignCount || 0,
            suffix: "+",
          },
          {
            label: "Instant Payouts",
            value: data.instantPayout || 2,
            suffix: " min",
          },
        ]);
      })
      .catch((err) => console.error("Error loading homepage stats:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <HomeNavbar />
      <main className="flex-grow">
        <HomeHero />
        <StatsBar stats={stats} />
        <StepsSection />
        <WhyChooseUs />
        <FAQSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
