import AboutHeroSection from "../../components/about/AboutHeroSection";
import VisionMissionSection from "../../components/about/VisionMissionSection ";
import TeamSection from "../../components/about/TeamSection ";
import TestimonialsSection from "../../components/about//TestimonialsSection";
import CallToActionSection from "../../components/about/CallToActionSection";
import MinimalFooter from "../../components/footer/MinimalFooter";
import UserSuccessStoriesSection from "../../components/about/UserSuccessStoriesSection";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <AboutHeroSection />
      <VisionMissionSection />
      <TeamSection />
      <UserSuccessStoriesSection />
      <TestimonialsSection />
      <CallToActionSection />
      <MinimalFooter />
    </div>
  );
};

export default About;
