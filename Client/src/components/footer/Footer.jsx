import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import logo from "../../../assets/logo.jpg";

const Footer = () => (
  <footer className="relative pt-0 overflow-hidden select-none mt-1">
    {/* SVG Wave Path */}
    <div className="overflow-hidden leading-none pointer-events-none">
      <svg
        width="100%"
        height="94"
        viewBox="0 0 1920 94"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0 Q480 120 960 40 Q1440 -40 1920 64 V94 H0 V0Z"
          fill="url(#footerwave)"
        />
        <defs>
          <linearGradient
            id="footerwave"
            x1="0"
            y1="0"
            x2="1920"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1e3a8a" />
            <stop offset="1" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        {/* Animated crest dots for fun effect */}
        <circle cx="340" cy="60" r="6" fill="#a7f3d0" opacity="0.7">
          <animate
            attributeName="cy"
            values="60;48;60"
            dur="1.4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="960" cy="32" r="7" fill="#fbbf24" opacity="0.7">
          <animate
            attributeName="cy"
            values="32;16;32"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="1580" cy="70" r="5" fill="#38bdf8" opacity="0.7">
          <animate
            attributeName="cy"
            values="70;58;70"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
    {/* Actual footer content */}
    <div className="relative bg-gradient-to-r from-blue-900 to-green-900 dark:from-slate-900 dark:to-green-950 text-white py-9 px-3 sm:px-4">
      <div className="absolute inset-0 bg-white/10 dark:bg-slate-900/20 rounded-tl-3xl rounded-tr-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-10 md:gap-0 md:flex-row items-center justify-between">
        {/* Brand and slogan */}
        <div className="flex flex-col items-center md:items-start relative mb-4 md:mb-0">
          <div className="absolute -top-6 left-[-30px] h-10 w-10 rounded-full bg-green-200/50 blur-xl animate-pulse hidden md:block"></div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-extrabold text-2xl tracking-tight">
              FuelFundr
            </span>
            <img
              src={logo}
              className="w-12 h-12 rounded-full border-2 border-blue-400 shadow-lg object-cover bg-white transition-transform duration-500 hover:rotate-180"
              alt="FuelFundr Logo"
            />
          </div>
          <span className="text-xs font-mono opacity-70 mb-2 text-center md:text-left tracking-wider">
            Empowering student ideas
            <br className="hidden md:inline" />& change-makers 🚀
          </span>
        </div>

        {/* Nav with separators */}
        <nav className="flex flex-wrap gap-x-4 gap-y-2 mt-2 md:mt-0 text-[1.05rem] font-bold items-center text-white/90 justify-center">
          {[
            { label: "About", href: "/about" },
            { label: "Campaigns", href: "/campaigns" },
            { label: "Dashboard", href: "/dashboard" },
          ].map((link, i, arr) => (
            <span key={link.label} className="flex items-center">
              <a
                href={link.href}
                className="hover:underline underline-offset-8 transition decoration-green-400 decoration-2 hover:decoration-wavy"
              >
                {link.label}
              </a>
              {i < arr.length - 1 && (
                <span className="mx-2 text-green-300/50 font-bold" aria-hidden>
                  ·
                </span>
              )}
            </span>
          ))}
        </nav>

        {/* Social/contact */}
        <div className="flex flex-col items-center md:items-end gap-2 mt-6 md:mt-0">
          <div className="flex gap-4 mb-2">
            <a
              href="https://github.com/shivanshanand"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="hover:text-green-200 hover:scale-110 transition"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/shivansh-anand-%F0%9F%93%88-aa48851b8/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="hover:text-green-200 hover:scale-110 transition"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://shivansh-portfolio-eta.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              title="Portfolio"
              className="hover:text-green-200 hover:scale-110 transition"
            >
              <FiGlobe size={22} />
            </a>
          </div>
          <a
            href="mailto:support@fuelfundr.com"
            className="text-xs font-semibold text-green-200 hover:underline hover:text-green-100 transition"
          >
            support@fuelfundr.com
          </a>
        </div>
      </div>
      <div className="pt-6 text-center text-xs font-bold opacity-80 select-none z-10 relative">
        &copy; {new Date().getFullYear()} FuelFundr. All rights reserved.
      </div>
    </div>
    <style>{`
      .animate-spin-slow { animation: spin 3.8s linear infinite; }
      @keyframes spin { 100% { transform: rotate(360deg); } }
      .hover\\:decoration-wavy:hover { text-decoration-style: wavy; }
    `}</style>
  </footer>
);

export default Footer;
