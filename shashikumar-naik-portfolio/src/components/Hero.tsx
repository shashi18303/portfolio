import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check,
  Zap,
  Volume2,
  VolumeX,
  Code2,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO, QUICK_METRICS } from '../data/resumeData';
import { LiveTelemetryDeck } from './LiveTelemetryDeck';
import { soundFx } from '../utils/audio';

interface HeroProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

const ROLES = [
  'Java 21 & Spring Boot Engineer',
  'Distributed Systems & Concurrency Architect',
  'High-Throughput In-Memory Caching Specialist',
  'Enterprise Microservices Developer (Vstand4U)'
];

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenTerminal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(soundFx.isEnabled());
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotating role text
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
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

  const copyPhone = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="overview" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background architectural grid & radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      
      {/* Ambient glowing radial orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main profile & text info */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status chip & Audio toggle */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-300 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-400 font-semibold">ONLINE</span>
                <span className="text-slate-600">|</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3 h-3 text-cyan-400" /> Bengaluru, India
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-cyan-300 font-medium">B.E. Comp Sci 2025</span>
              </div>

              {/* Sound FX Toggle Pill */}
              <button
                onClick={toggleSound}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${
                  soundEnabled
                    ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-300 shadow-sm shadow-cyan-900/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                title="Toggle futuristic interactive sound effects"
              >
                {soundEnabled ? <Volume2 className="w-3 h-3 text-cyan-400" /> : <VolumeX className="w-3 h-3" />}
                <span>SFX: {soundEnabled ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Name and headline */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-amber-400 tracking-widest uppercase flex items-center gap-2">
                <span className="w-8 h-[1px] bg-amber-400 inline-block" />
                <span>Java Developer · Backend Engineer</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-serif-display leading-[1.08]">
                Shashi<span className="text-amber-400 italic">kumar</span> Naik
              </h1>
              
              {/* Dynamic Animated Role Switcher */}
              <div className="h-8 flex items-center">
                <span className="text-base sm:text-lg font-semibold text-slate-200 font-mono flex items-center">
                  <span className="text-amber-400 mr-2 font-bold">&gt;</span>
                  <span className="text-slate-100 transition-opacity duration-300">{ROLES[roleIndex]}</span>
                  <span className="inline-block w-2 h-4 bg-amber-400 ml-1.5 animate-pulse" />
                </span>
              </div>
            </div>

            {/* Professional summary paragraph */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Building scalable backend systems with <strong className="text-white font-semibold">Spring Boot, Hibernate &amp; REST APIs</strong>. Computer Science graduate (7.7 CGPA) passionate about clean architecture, distributed job scheduling, and high-performance database optimization. Currently gaining production experience at <strong className="text-amber-300 font-medium">VStand4u Solutions</strong> in Bangalore.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                id="hero-explore-projects-btn"
                onClick={() => soundFx.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/20 hover:-translate-y-0.5"
              >
                <span>View Projects ↓</span>
              </a>

              <a
                href="#contact"
                id="hero-contact-btn"
                onClick={() => soundFx.playClick()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-[#1e1c33] bg-[#0b0a17] hover:border-slate-500 text-slate-200 font-medium text-sm transition-all hover:-translate-y-0.5"
              >
                <span>Get In Touch →</span>
              </a>

              <a
                href="#architecture-lab"
                id="hero-try-labs-btn"
                onClick={() => soundFx.playClick()}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-md border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-950/70 text-cyan-300 font-mono text-xs transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Architecture Lab</span>
              </a>

              <button
                onClick={() => { soundFx.playClick(); onOpenResume(); }}
                id="hero-view-resume-btn"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-md border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-colors"
              >
                <span>Resume</span>
              </button>

              <button
                onClick={() => { soundFx.playClick(); onOpenTerminal(); }}
                id="hero-open-terminal-btn"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 font-mono text-xs transition-colors"
                title="Launch command line interface"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>`help`</span>
              </button>
            </div>

            {/* Direct Contact Links */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors bg-slate-900/60 px-3 py-1.5 rounded-md border border-slate-800 hover:border-cyan-500/40"
                title="Click to copy email"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400 ml-1" /> : <Copy className="w-3 h-3 text-slate-500 ml-1" />}
              </button>

              <button
                onClick={copyPhone}
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors bg-slate-900/60 px-3 py-1.5 rounded-md border border-slate-800 hover:border-emerald-500/40"
                title="Click to copy phone number"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PERSONAL_INFO.phone}</span>
                {copiedPhone ? <Check className="w-3 h-3 text-emerald-400 ml-1" /> : <Copy className="w-3 h-3 text-slate-500 ml-1" />}
              </button>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors bg-slate-900/60 px-3 py-1.5 rounded-md border border-slate-800"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors bg-slate-900/60 px-3 py-1.5 rounded-md border border-slate-800"
              >
                <Github className="w-3.5 h-3.5 text-slate-200" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Right Live Architectural Telemetry Deck */}
          <div className="lg:col-span-5">
            <LiveTelemetryDeck />
          </div>

        </div>

        {/* Quick metrics row with glowing hover effects */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {QUICK_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all shadow-md group"
            >
              <div className="text-xs text-slate-400 font-mono group-hover:text-cyan-400 transition-colors">
                {metric.label}
              </div>
              <div className="text-lg font-bold text-white mt-1 font-mono tracking-tight">
                {metric.value}
              </div>
              <div className="text-[11px] text-cyan-300/80 mt-0.5 font-mono">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
