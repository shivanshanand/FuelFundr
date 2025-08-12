import AboutHeroSection from "../../components/about/AboutHeroSection";
import VisionMissionSection from "../../components/about/VisionMissionSection ";
import TeamSection from "../../components/about/TeamSection ";
import TestimonialsSection from "../../components/about//TestimonialsSection";
import CallToActionSection from "../../components/about/CallToActionSection";
import MinimalFooter from "../../components/footer/MinimalFooter";
import UserSuccessStoriesSection from "../../components/about/UserSuccessStoriesSection";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-950 to-green-950 dark:from-slate-900 dark:via-blue-950 dark:to-green-950 transition-colors relative">
      {/* All About Sections */}
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
