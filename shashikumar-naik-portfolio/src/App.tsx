import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsMarquee } from './components/SkillsMarquee';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ArchitectureLab } from './components/ArchitectureLab';
import { SkillsMatrix } from './components/SkillsMatrix';
import { EducationCertifications } from './components/EducationCertifications';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ResumeModal } from './components/ResumeModal';
import { NetworkCanvas } from './components/NetworkCanvas';
import { BloomCursor } from './components/BloomCursor';
import { Terminal, FileText } from 'lucide-react';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is actively typing inside an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        if (e.key === 'Escape') {
          setIsTerminalOpen(false);
          setIsResumeModalOpen(false);
        }
        return;
      }

      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsTerminalOpen(false);
        setIsResumeModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      
      {/* Round Bloom Ambient Cursor */}
      <BloomCursor />

      {/* Background Interactive Distributed Node Network */}
      <NetworkCanvas />

      {/* Sticky Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeModalOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero
          onOpenResume={() => setIsResumeModalOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Skills Marquee Banner */}
        <SkillsMarquee />

        {/* About / Who I Am Section */}
        <AboutSection />

        <ExperienceSection />

        <ProjectsSection />

        <ArchitectureLab />

        <SkillsMatrix />

        <EducationCertifications />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* Floating Action Quick Access (Bottom Right on desktop/tablet) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2">
        <button
          onClick={() => setIsResumeModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-mono shadow-xl backdrop-blur transition-all hover:scale-105"
          title="Open printable ATS Resume"
        >
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span>Resume</span>
        </button>

        <button
          onClick={() => setIsTerminalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono shadow-xl shadow-cyan-900/30 transition-all hover:scale-105"
          title="Open Interactive Shell (`~` key)"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Shell (`~`)</span>
        </button>
      </div>

      {/* Interactive Terminal Modal */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* ATS-Optimized Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

    </div>
  );
}
