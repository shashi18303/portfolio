import React from 'react';
import { User, Code2, Globe, Heart, Award, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/resumeData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 border-t border-[#181628] relative bg-[#040408]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end gap-6 mb-16">
          <div>
            <div className="font-mono text-xs text-amber-400/80 tracking-widest uppercase mb-2">
              01 / ABOUT
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Who I Am
            </h2>
          </div>
          <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-[#1e1c33] via-amber-400/20 to-transparent mb-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg text-slate-300 leading-relaxed">
              I'm a Computer Science graduate from <span className="text-white font-medium">Belagavi, India</span>, with a deep passion for backend engineering. My journey started with Java fundamentals and evolved into building production-grade microservices using <span className="text-amber-400 font-medium">Spring Boot, Hibernate, and PostgreSQL</span>.
            </p>
            <p className="text-base text-slate-400 leading-relaxed">
              I thrive in environments where clean architecture matters — writing code that's not just functional, but maintainable, testable, and well-reasoned. Through my 8-month tenure as a <span className="text-slate-200 font-medium">Java Developer Intern at VStand4u Solutions</span> in Bangalore, I engineered live backend REST APIs, resolved production anomalies, and optimized database queries using raw JDBC batching.
            </p>

            {/* Languages Spoken */}
            <div className="pt-4 border-t border-[#181628]">
              <div className="font-mono text-xs uppercase tracking-wider text-amber-400/80 mb-3">
                Languages Spoken
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full border border-[#1e1c33] bg-[#0b0a17] text-xs font-mono text-slate-300">
                  🇬🇧 English — Professional
                </span>
                <span className="px-3 py-1.5 rounded-full border border-[#1e1c33] bg-[#0b0a17] text-xs font-mono text-slate-300">
                  🇮🇳 Kannada — Native
                </span>
                <span className="px-3 py-1.5 rounded-full border border-[#1e1c33] bg-[#0b0a17] text-xs font-mono text-slate-300">
                  🇮🇳 Hindi — Conversational
                </span>
              </div>
            </div>

            {/* Soft Skills */}
            <div className="pt-4 border-t border-[#181628]">
              <div className="font-mono text-xs uppercase tracking-wider text-amber-400/80 mb-3">
                Core Engineering Strengths
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Effective Technical Communicator',
                  'Agile / Scrum Team Player',
                  'Production Root-Cause Analysis',
                  'Deadline-Driven & Analytical',
                  'Clean Code & Documentation'
                ].map((strength) => (
                  <span
                    key={strength}
                    className="px-3 py-1.5 rounded-full border border-[#1e1c33] bg-[#0b0a17] text-xs font-mono text-slate-300 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{strength}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Code block + Degree highlight */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Interactive Developer Object Code Block */}
            <div className="rounded-xl border border-[#1e1c33] bg-[#07060f] overflow-hidden shadow-2xl">
              <div className="px-4 py-3 bg-[#0b0a17] border-b border-[#181628] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-slate-500">developer.ts</span>
              </div>
              <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-400 overflow-x-auto">
                <div><span className="text-cyan-400">const</span> <span className="text-amber-400 font-semibold">developer</span> = &#123;</div>
                <div className="pl-4"><span className="text-slate-300">name</span>: <span className="text-emerald-400">"Shashikumar Naik"</span>,</div>
                <div className="pl-4"><span className="text-slate-300">role</span>: <span className="text-emerald-400">"Java Developer & Backend Engineer"</span>,</div>
                <div className="pl-4"><span className="text-slate-300">location</span>: <span className="text-emerald-400">"Bangalore, India"</span>,</div>
                <div className="pl-4"><span className="text-slate-300">stack</span>: [</div>
                <div className="pl-8 text-emerald-400">"Spring Boot", "Java 21 / 8", "Hibernate", "PostgreSQL", "MySQL", "REST APIs"</div>
                <div className="pl-4">],</div>
                <div className="pl-4"><span className="text-slate-300">cgpa</span>: <span className="text-amber-400 font-bold">7.7</span>,</div>
                <div className="pl-4"><span className="text-slate-300">status</span>: <span className="text-emerald-400">"Open to Opportunities"</span></div>
                <div>&#125;;</div>
                <div className="mt-3 text-slate-500 italic">
                  // Built scalable modules at VStand4u Solutions &amp; distributed schedulers
                </div>
              </div>
            </div>

            {/* Academic Credential Card with CGPA 7.7 */}
            <div className="p-6 rounded-xl border border-[#1e1c33] bg-[#07060f] flex items-center justify-between gap-4 hover:border-amber-400/40 transition-all group">
              <div>
                <div className="text-xs font-mono text-amber-400/90 uppercase tracking-wider mb-1">
                  Education Credential
                </div>
                <div className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  B.E. Computer Science
                </div>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  Angadi Institute of Technology &amp; Management • Belagavi
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-2">
                  Graduated: Jun 2025
                </div>
              </div>

              <div className="text-center px-4 py-3 rounded-lg border border-amber-500/30 bg-amber-950/20 text-amber-400">
                <div className="text-xl font-bold font-mono">7.7</div>
                <div className="text-[10px] font-mono uppercase text-amber-500/80">CGPA / 10</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
