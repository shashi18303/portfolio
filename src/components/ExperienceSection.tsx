import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Award,
  ArrowRight,
  TrendingDown,
  Database,
  Server,
  Lock,
  Terminal,
  Activity
} from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/resumeData';
import { soundFx } from '../utils/audio';

type ExpTab = 'deliverables' | 'optimization' | 'architecture';

export const ExperienceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ExpTab>('deliverables');
  const [batchSize, setBatchSize] = useState<number>(500);

  const exp = EXPERIENCE_DATA[0];

  // Dynamic simulation of query latency improvement
  const unoptimizedMs = Math.round((batchSize * 0.9) + 40);
  const optimizedMs = Math.round((batchSize * 0.06) + 12);
  const latencyReduction = Math.round(((unoptimizedMs - optimizedMs) / unoptimizedMs) * 100);

  return (
    <section id="experience" className="py-16 md:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end gap-6 mb-12">
          <div>
            <div className="font-mono text-xs text-amber-400/80 tracking-widest uppercase mb-2">
              03 / EXPERIENCE
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Work History
            </h2>
            <p className="mt-3 text-base text-slate-400 leading-relaxed max-w-2xl">
              Hands-on software development at <strong className="text-white font-medium">VStand4u Solutions</strong> in Bangalore, engineering scalable backend REST APIs, optimizing MySQL queries with JDBC &amp; Hibernate, and executing systematic root-cause debugging.
            </p>
          </div>
          <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-[#1e1c33] via-amber-400/20 to-transparent mb-6" />
        </div>

        {/* Main Experience Card */}
        <div className="rounded-2xl border border-slate-700/80 bg-[#0d1322]/95 backdrop-blur-xl shadow-2xl shadow-cyan-950/20 overflow-hidden">
          
          {/* Card Header with Glowing Accents */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-slate-900 via-[#0b101c] to-slate-900 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-600/50 font-mono shadow-sm">
                  FULL TENURE • 8 MONTHS
                </span>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 font-mono flex items-center gap-1">
                  <Award className="w-3 h-3" /> Certified Experience
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                {exp.role} <span className="text-slate-500 font-normal">@</span> <span className="text-cyan-400">{exp.company}</span>
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {exp.location}
                </span>
                <span className="text-slate-500 hidden sm:inline">•</span>
                <span className="text-cyan-300">Enterprise Java & Spring Boot Stack</span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-3">
              {exp.metrics?.map((m, i) => (
                <div key={i} className="px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center min-w-[95px] shadow-sm">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">{m.label}</div>
                  <div className="text-sm sm:text-base font-bold text-cyan-300 font-mono mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Mode Navigator */}
          <div className="px-6 py-3 bg-[#080d18] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="text-slate-400 font-semibold uppercase tracking-wider">
              Explore Contributions:
            </span>

            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => { soundFx.playClick(); setActiveTab('deliverables'); }}
                className={`px-3 py-1.5 rounded transition-all ${
                  activeTab === 'deliverables'
                    ? 'bg-cyan-600 text-white font-semibold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Deliverables & Impact
              </button>

              <button
                onClick={() => { soundFx.playClick(); setActiveTab('optimization'); }}
                className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                  activeTab === 'optimization'
                    ? 'bg-cyan-600 text-white font-semibold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TrendingDown className="w-3.5 h-3.5" />
                <span>JDBC Latency Lab</span>
              </button>

              <button
                onClick={() => { soundFx.playClick(); setActiveTab('architecture'); }}
                className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                  activeTab === 'architecture'
                    ? 'bg-cyan-600 text-white font-semibold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>Microservice Flow</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Deliverables & Impact */}
          {activeTab === 'deliverables' && (
            <div className="p-6 md:p-8 space-y-6">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300 leading-relaxed">
                {exp.description}
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" /> Key Engineering Deliverables & Impact
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exp.achievements.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex items-start gap-3 group"
                    >
                      <div className="mt-0.5 p-1 rounded-md bg-cyan-950/80 text-cyan-400 border border-cyan-800/50 shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Highlights breakdown boxes */}
              <div className="pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold">
                    <Zap className="w-4 h-4" />
                    <span>JDBC Batching Optimization</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Replaced slow individual roundtrip row inserts with parameterized JDBC batch batches, reducing database latency by over 85%.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Parameterized Security</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Enforced strict parameterized queries preventing SQL injection, coupled with JSR-380 input validation on all REST endpoints.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>JUnit 5 Defect Triage</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Formulated structured root cause analysis (RCA) for production tickets, authoring deterministic test suites to prevent regression.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: JDBC Latency Optimization Lab */}
          {activeTab === 'optimization' && (
            <div className="p-6 md:p-8 space-y-6 font-mono">
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Vstand4U Production Case Study: Raw JDBC Batching vs Individual Roundtrips</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  During enterprise operations, bulk audit records and transactional events were causing database connection starvation due to sequential network round-trips. Shashikumar implemented PreparedStatement batching with chunked commits.
                </p>
              </div>

              {/* Interactive batch slider */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between text-xs">
                  <span className="text-slate-300">Simulate Bulk Record Ingestion:</span>
                  <span className="text-cyan-400 font-bold">{batchSize} Records</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={2000}
                  step={100}
                  value={batchSize}
                  onChange={(e) => setBatchSize(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Visual Benchmark Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Before: Sequential Roundtrips */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-900/40 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-rose-400 font-bold">WITHOUT BATCHING (Sequential)</span>
                    <span className="text-rose-400 font-bold">{unoptimizedMs} ms</span>
                  </div>
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <div>• Individual connection acquire/release per row</div>
                    <div>• High network roundtrip overhead (RTT)</div>
                    <div>• Database thread starvation under peak traffic</div>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* After: JDBC Batching */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-700/50 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-bold">WITH SHASHIKUMAR'S JDBC BATCHING</span>
                    <span className="text-emerald-400 font-bold">{optimizedMs} ms</span>
                  </div>
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <div>• Single network roundtrip per batch chunk (500 rows)</div>
                    <div>• PreparedStatement execution with parameterized cache</div>
                    <div>• <strong className="text-emerald-300 font-bold">{latencyReduction}% Latency Reduction</strong></div>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, (optimizedMs / unoptimizedMs) * 100)}%` }}
                    />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: Microservice Flow Diagram */}
          {activeTab === 'architecture' && (
            <div className="p-6 md:p-8 space-y-6">
              <div className="text-xs font-mono text-slate-400">
                Architectural Flow of Vstand4U Production Service Modules:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center font-mono text-xs">
                
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 mx-auto rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                    <Server className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-white text-[11px]">Client / Mobile</div>
                  <div className="text-[10px] text-slate-400">JSON REST / HTTPS</div>
                </div>

                <div className="flex items-center justify-center text-cyan-400 sm:block sm:pt-6">
                  <ArrowRight className="w-5 h-5 mx-auto" />
                </div>

                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-600/50 space-y-2">
                  <div className="w-8 h-8 mx-auto rounded-lg bg-cyan-900 border border-cyan-500 flex items-center justify-center text-cyan-300">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-white text-[11px]">Auth & DTO Filter</div>
                  <div className="text-[10px] text-cyan-300">JSR-380 Validation</div>
                </div>

                <div className="flex items-center justify-center text-cyan-400 sm:block sm:pt-6">
                  <ArrowRight className="w-5 h-5 mx-auto" />
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 mx-auto rounded-lg bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-white text-[11px]">MySQL + JDBC Batch</div>
                  <div className="text-[10px] text-emerald-400">Optimized Execution</div>
                </div>

              </div>
            </div>
          )}

          {/* Footer Tech Stack Pills */}
          <div className="p-6 md:p-8 bg-[#080d18] border-t border-slate-800/80 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-mono mr-2">Technologies Used at Vstand4U:</span>
            {exp.skillsUsed.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700/60 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
