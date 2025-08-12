import { useState } from "react";
import { Rocket, Users } from "lucide-react";
import { Link } from "react-router-dom";
import ComingSoonModal from "../modals/ComingSoonModal ";

const CallToActionSection = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <section className="w-full py-16 px-4 flex flex-col items-center bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/30">
      <div className="max-w-4xl w-full mx-auto rounded-2xl glassy-card shadow-xl border border-green-100 dark:border-blue-900 bg-white/80 dark:bg-slate-900/70 flex flex-col items-center py-12 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-5 bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent tracking-tight drop-shadow">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-gray-700 dark:text-green-100 mb-8">
          Launch a campaign, support a peer, or join our student community.
          <br className="hidden md:inline" />
          FuelFundr is where change begins—with you!
        </p>
        <div className="flex flex-col sm:flex-row gap-5 w-full max-w-xl justify-center mt-4">
          <Link
            to="/campaigns/create"
            className="flex-1 flex justify-center items-center gap-2 bg-gradient-to-r from-green-400 to-blue-600 hover:from-green-500 hover:to-blue-700 text-white font-bold px-7 py-4 rounded-xl text-lg shadow transition"
          >
            <Rocket className="w-6 h-6" />
            Start a Campaign
          </Link>
          {/* Use button, not Link, so it never tries to route */}
          <button
            type="button"
            className="flex-1 flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-green-400 hover:from-blue-700 hover:to-green-500 text-white font-bold px-7 py-4 rounded-xl text-lg shadow transition focus:outline-none"
            onClick={() => setShowComingSoon(true)}
          >
            <Users className="w-6 h-6" />
            Join Community
          </button>
        </div>
        <div className="mt-7 text-sm text-white font-semibold opacity-70">
          Got questions?{" "}
          <a
            href="mailto:support@fuelfundr.com"
            className="underline underline-offset-2 hover:text-green-600"
          >
            Contact us
          </a>
        </div>
      </div>
      <style>{`
        .glassy-card { backdrop-filter: blur(7px);}
      `}</style>
      <ComingSoonModal
        show={showComingSoon}
        onClose={() => setShowComingSoon(false)}
      />
    </section>
  );
};

export default CallToActionSection;
