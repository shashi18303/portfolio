import React from 'react';
import { PERSONAL_INFO } from '../data/resumeData';
import { Github, Linkedin, Mail, Phone, Heart, Terminal, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal, onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-[#080d18] text-slate-400 py-12 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-700/60 flex items-center justify-center font-bold text-cyan-400">
              SN
            </div>
            <div>
              <div className="text-slate-200 font-semibold">{PERSONAL_INFO.name}</div>
              <div className="text-[11px] text-slate-500">{PERSONAL_INFO.title} • Bengaluru, India</div>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a href="#overview" className="hover:text-cyan-400 transition-colors">Overview</a>
            <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#architecture-lab" className="hover:text-cyan-400 transition-colors">Architecture Lab</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <button onClick={onOpenResume} className="hover:text-cyan-400 transition-colors">Resume</button>
            <button onClick={onOpenTerminal} className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-cyan-300">
              <Terminal className="w-3 h-3" /> Terminal
            </button>
          </div>

          {/* Socials and back to top */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-blue-400 hover:border-slate-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-slate-700 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-slate-700 transition-colors ml-2"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
          <div>
            © 2025–{new Date().getFullYear()} {PERSONAL_INFO.name} · Bangalore, India
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open to opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
