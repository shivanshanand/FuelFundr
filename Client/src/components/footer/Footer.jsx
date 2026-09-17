import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";

const Footer = () => (
  <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-white/5 py-12 px-6 sm:px-8 mt-auto transition-colors duration-200 select-none">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-200/50 dark:border-white/5">
      {/* Brand & Slogan */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white mb-2">
          FuelFundr<span className="text-indigo-500">.</span>
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-tight leading-relaxed max-w-[200px]">
          Empowering student ideas & campus change-makers 🚀
        </span>
      </div>

      {/* Nav Link List */}
      <nav className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
        {[
          { label: "About", href: "/about" },
          { label: "Campaigns", href: "/campaigns" },
          { label: "Dashboard", href: "/dashboard" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Social / Contact */}
      <div className="flex flex-col items-center md:items-end gap-2">
        <div className="flex gap-4 text-slate-400 dark:text-slate-500">
          <a
            href="https://github.com/shivanshanand"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="hover:text-indigo-500 dark:hover:text-indigo-400 hover:scale-105 transition"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/shivansh-anand-%F0%9F%93%88-aa48851b8/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="hover:text-indigo-500 dark:hover:text-indigo-400 hover:scale-105 transition"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://shivansh-portfolio-eta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            title="Portfolio"
            className="hover:text-indigo-500 dark:hover:text-indigo-400 hover:scale-105 transition"
          >
            <FiGlobe size={20} />
          </a>
        </div>
        <a
          href="mailto:support@fuelfundr.com"
          className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
        >
          support@fuelfundr.com
        </a>
      </div>
    </div>
    <div className="pt-6 text-center text-xs font-mono text-slate-400 dark:text-slate-600">
      &copy; {new Date().getFullYear()} FuelFundr. All rights reserved.
    </div>
  </footer>
);

export default Footer;
