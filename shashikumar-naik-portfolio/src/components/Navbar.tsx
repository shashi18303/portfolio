import React, { useState, useEffect } from 'react';
import { Terminal, FileText, Menu, X, Check, Copy, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/resumeData';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(soundFx.isEnabled());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const enabled = soundFx.toggle();
    setSoundEnabled(enabled);
  };

  const copyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Architecture Lab', href: '#architecture-lab' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education & Certs', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0b0f19]/90 backdrop-blur-xl border-b border-slate-800/90 shadow-xl shadow-cyan-950/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <a 
          href="#overview" 
          id="nav-brand" 
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-teal-500/10 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
            SN
          </div>
          <div>
            <div className="font-semibold text-slate-100 text-sm sm:text-base flex items-center gap-2">
              <span>{PERSONAL_INFO.name}</span>
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Available for hire"></span>
            </div>
            <p className="text-xs text-slate-400 font-mono hidden sm:block">Java & Spring Boot Engineer</p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              id={`nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              href={link.href}
              onClick={() => soundFx.playClick()}
              className="px-3 py-1.5 text-xs xl:text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Sound toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled
                ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title={`Sound FX: ${soundEnabled ? 'Enabled' : 'Disabled'}`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            id="nav-terminal-btn"
            onClick={() => { soundFx.playClick(); onOpenTerminal(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-900/70 hover:bg-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all"
            title="Open Interactive Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Terminal</span>
            <span className="text-[10px] px-1 py-0.2 bg-slate-800 rounded border border-slate-700 text-slate-400">`</span>
          </button>

          <button
            id="nav-resume-btn"
            onClick={() => { soundFx.playClick(); onOpenResume(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-900/70 hover:bg-slate-800 hover:border-slate-600 text-slate-300 text-xs font-medium transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Resume</span>
          </button>

          <button
            id="nav-copy-email-btn"
            onClick={copyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white text-xs font-medium shadow-md shadow-cyan-900/30 transition-all hover:scale-105"
            title="Copy email to clipboard"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2 text-slate-300 hover:text-cyan-400"
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            id="nav-mobile-resume-btn"
            onClick={onOpenResume}
            className="p-2 text-slate-300 hover:text-cyan-400"
            aria-label="View Resume"
          >
            <FileText className="w-5 h-5" />
          </button>
          <button
            id="nav-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0b0f19]/98 border-b border-slate-800 px-4 py-4 space-y-2 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => { soundFx.playClick(); setMobileMenuOpen(false); }}
              className="block py-2 text-slate-300 hover:text-cyan-400"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => { soundFx.playClick(); onOpenTerminal(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Launch Terminal Shell</span>
            </button>
            <button
              onClick={() => { copyEmail(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 py-2 rounded bg-cyan-600 text-white font-medium"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedEmail ? 'Copied!' : 'Copy Email Address'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
