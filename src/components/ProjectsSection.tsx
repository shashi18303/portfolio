import React, { useState } from 'react';
import { 
  FolderGit2, 
  Layers, 
  Code2, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  Server, 
  Terminal, 
  Zap, 
  ArrowUpRight,
  Database,
  Cpu,
  Play,
  Activity,
  Lock,
  RefreshCw
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/resumeData';
import { soundFx } from '../utils/audio';

export const ProjectsSection: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS_DATA[0].id);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'code' | 'api' | 'sandbox'>('sandbox');
  const [copiedCode, setCopiedCode] = useState(false);

  // Live Sandbox state for Distributed Job Scheduler
  const [jobName, setJobName] = useState('PROCESS_PAYMENT_SETTLEMENTS');
  const [cronExpr, setCronExpr] = useState('0 0 2 * * ?');
  const [isExecutingJob, setIsExecutingJob] = useState(false);
  const [jobResponse, setJobResponse] = useState<any>({
    status: 'SCHEDULED',
    jobId: 'job_batch_77a9',
    assignedLeaderNode: 'srv-alpha-01',
    executionTimeMs: 14,
    distributedLock: {
      type: 'POSTGRES_ADVISORY_LOCK',
      key: '0x7A4F_LEADER',
      heldBy: 'srv-alpha-01',
      ttlRemainingMs: 2850
    },
    httpCode: 201
  });

  // Live Sandbox state for LRU Cache
  const [cacheKey, setCacheKey] = useState('user:auth:session_992');
  const [cacheVal, setCacheVal] = useState('{"role": "ADMIN", "permissions": ["READ", "WRITE"]}');
  const [cacheSimResult, setCacheSimResult] = useState<any>({
    action: 'PUT',
    status: 'CACHE_SAVED',
    key: 'user:auth:session_992',
    capacity: '1024 / 2048 entries',
    evictionTriggered: false,
    latencyNs: '240 ns (O(1))'
  });

  const currentProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];

  const copyCode = (codeText: string) => {
    soundFx.playClick();
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSimulateJobSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    setIsExecutingJob(true);
    setTimeout(() => {
      soundFx.playSuccess();
      setIsExecutingJob(false);
      setJobResponse({
        status: 'SCHEDULED_SUCCESS',
        jobId: `job_${Math.random().toString(36).substring(2, 9)}`,
        jobName,
        cron: cronExpr,
        assignedLeaderNode: 'srv-alpha-01',
        executionTimeMs: Math.floor(Math.random() * 12) + 8,
        distributedLock: {
          type: 'POSTGRES_ADVISORY_LOCK',
          key: '0x7A4F_LEADER',
          heldBy: 'srv-alpha-01',
          ttlRemainingMs: 2980
        },
        workerThread: `virtual-worker-${Math.floor(Math.random() * 100) + 1}`,
        httpCode: 201
      });
    }, 450);
  };

  const handleSimulateCachePut = () => {
    soundFx.playClick();
    setCacheSimResult({
      action: 'PUT',
      status: 'CACHE_STORED_MRU',
      key: cacheKey,
      valueSnippet: cacheVal.substring(0, 30) + '...',
      memoryNode: 'Re-linked to HEAD (Most Recently Used)',
      latency: '< 0.04 ms (O(1))',
      eviction: 'None (Capacity 1025 / 2048)'
    });
  };

  const handleSimulateCacheGet = () => {
    soundFx.playSuccess();
    setCacheSimResult({
      action: 'GET',
      status: 'CACHE_HIT (200 OK)',
      key: cacheKey,
      returnedPayload: cacheVal,
      memoryNode: 'Promoted to Doubly-Linked-List HEAD',
      latency: '0.012 ms (O(1) Map Lookup)',
      hitRatio: '94.8%'
    });
  };

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="font-mono text-xs text-amber-400/80 tracking-widest uppercase mb-2">
              04 / PROJECTS
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Selected Work
            </h2>
            <p className="mt-3 text-base text-slate-400 leading-relaxed">
              Engineered in Java 21 &amp; Spring Boot: tackling distributed leader election, atomic PostgreSQL advisory locking, custom O(1) in-memory data structures, and thread-safe concurrency.
            </p>
          </div>
          <div className="hidden lg:block flex-1 h-[1px] bg-gradient-to-r from-[#1e1c33] via-amber-400/20 to-transparent mb-6" />
          <a
            href="#architecture-lab"
            onClick={() => soundFx.playClick()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-amber-400/10 border border-amber-500/40 text-amber-300 hover:bg-amber-400/20 text-xs font-mono transition-all shrink-0 mb-4"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Try Failover Lab →</span>
          </a>
        </div>

        {/* Project Selector Cards (Glowing Bento style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {PROJECTS_DATA.map((project) => {
            const isSelected = project.id === selectedProjectId;
            return (
              <button
                key={project.id}
                id={`project-tab-${project.id}`}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedProjectId(project.id);
                  setActiveTab('sandbox');
                }}
                className={`text-left p-6 rounded-2xl border transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-br from-slate-900/95 via-[#0c1424] to-slate-900 border-cyan-500 shadow-xl shadow-cyan-950/40'
                    : 'bg-[#0d1322]/80 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
                )}

                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60' : 'bg-slate-800 text-slate-400'}`}>
                      {project.id === 'distributed-scheduler' ? (
                        <Cpu className="w-4 h-4" />
                      ) : (
                        <Database className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-xs font-mono text-slate-400">{project.period}</span>
                  </div>

                  {isSelected && (
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-600/50 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      ACTIVE INSPECTION
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{project.tagline}</p>

                <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800/40 text-slate-500">
                      +{project.tags.length - 4} more
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Project Full Interactive Deep-Dive */}
        <div className="rounded-2xl border border-slate-700/80 bg-[#0d1322]/95 backdrop-blur-xl shadow-2xl shadow-cyan-950/20 overflow-hidden">
          
          {/* Card Top Navigation Bar */}
          <div className="px-6 py-4 bg-[#080d18] border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Project Deep-Dive:</span>
              <span className="text-sm font-semibold text-white">{currentProject.title}</span>
            </div>

            <div className="flex flex-wrap items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs font-medium">
              <button
                onClick={() => { soundFx.playClick(); setActiveTab('sandbox'); }}
                className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                  activeTab === 'sandbox'
                    ? 'bg-cyan-600 text-white font-semibold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Live API Sandbox</span>
              </button>

              <button
                onClick={() => { soundFx.playClick(); setActiveTab('overview'); }}
                className={`px-3 py-1.5 rounded transition-all ${
                  activeTab === 'overview'
                    ? 'bg-cyan-600 text-white font-semibold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Overview & Impact
              </button>

              <button
                onClick={() => { soundFx.playClick(); setActiveTab('architecture'); }}
                className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                  activeTab === 'architecture'
                    ? 'bg-cyan-600 text-white font-semibold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Architecture & Decisions</span>
              </button>

              <button
                onClick={() => { soundFx.playClick(); setActiveTab('code'); }}
                className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                  activeTab === 'code'
                    ? 'bg-cyan-600 text-white font-semibold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </button>
            </div>
          </div>

          {/* TAB 0: LIVE API SANDBOX (Awesome Interactive Feature) */}
          {activeTab === 'sandbox' && (
            <div className="p-6 md:p-8 space-y-6">
              
              {currentProject.id === 'distributed-scheduler' ? (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs font-mono text-cyan-300 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <span>Interactive Dispatch: Test POST /api/v1/jobs against the Leader Lock</span>
                    </span>
                    <span className="text-slate-400 text-[11px] hidden sm:inline">Spring Boot 3.x REST Endpoint</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Input controls */}
                    <div className="lg:col-span-6 space-y-4 font-mono text-xs">
                      <div>
                        <label className="block text-slate-400 mb-1.5">Job Name Identifier</label>
                        <input
                          type="text"
                          value={jobName}
                          onChange={(e) => setJobName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1.5">Cron Schedule Expression</label>
                        <input
                          type="text"
                          value={cronExpr}
                          onChange={(e) => setCronExpr(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={handleSimulateJobSchedule}
                          disabled={isExecutingJob}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-medium text-xs font-mono transition-all shadow-md shadow-cyan-950/40 disabled:opacity-50"
                        >
                          {isExecutingJob ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Acquiring Postgres Advisory Lock...</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Dispatch Job (POST /api/v1/jobs)</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                        <div>• Locks acquired atomically via <code className="text-cyan-400">pg_try_advisory_lock</code></div>
                        <div>• Standby follower nodes ignore job if not holding leader lease</div>
                      </div>
                    </div>

                    {/* Live JSON Response Terminal */}
                    <div className="lg:col-span-6">
                      <div className="rounded-xl border border-slate-800 bg-[#070b14] p-4 font-mono text-xs space-y-2 h-full">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                          <span className="text-emerald-400 font-bold">HTTP 201 CREATED</span>
                          <span className="text-cyan-400">{jobResponse.executionTimeMs} ms</span>
                        </div>
                        <pre className="text-emerald-300 overflow-x-auto text-[11px] leading-relaxed">
                          {JSON.stringify(jobResponse, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs font-mono text-cyan-300 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-cyan-400" />
                      <span>Interactive O(1) Memory Engine: Test ConcurrentHashMap + Doubly Linked List</span>
                    </span>
                    <span className="text-slate-400 text-[11px] hidden sm:inline">Thread-Safe ReentrantReadWriteLock</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Controls */}
                    <div className="lg:col-span-6 space-y-4 font-mono text-xs">
                      <div>
                        <label className="block text-slate-400 mb-1.5">Cache Key String</label>
                        <input
                          type="text"
                          value={cacheKey}
                          onChange={(e) => setCacheKey(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1.5">Cache Value JSON / String</label>
                        <input
                          type="text"
                          value={cacheVal}
                          onChange={(e) => setCacheVal(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                          onClick={handleSimulateCachePut}
                          className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs font-mono transition-all shadow-md shadow-cyan-950/40"
                        >
                          <span>Execute PUT (MRU)</span>
                        </button>

                        <button
                          onClick={handleSimulateCacheGet}
                          className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs font-mono transition-all shadow-md shadow-teal-950/40"
                        >
                          <span>Execute GET</span>
                        </button>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                        <div>• Accessing a key promotes node to Doubly Linked List HEAD</div>
                        <div>• Tail node automatically evicted when capacity &gt; 2048</div>
                      </div>
                    </div>

                    {/* Results Display */}
                    <div className="lg:col-span-6">
                      <div className="rounded-xl border border-slate-800 bg-[#070b14] p-4 font-mono text-xs space-y-2 h-full">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                          <span className="text-cyan-400 font-bold">O(1) CACHE TELEMETRY</span>
                          <span className="text-emerald-400">Zero JVM Overhead</span>
                        </div>
                        <pre className="text-emerald-300 overflow-x-auto text-[11px] leading-relaxed">
                          {JSON.stringify(cacheSimResult, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 1: Overview & Impact */}
          {activeTab === 'overview' && (
            <div className="p-6 md:p-8 space-y-6">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300 leading-relaxed">
                {currentProject.overview}
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Implementation Highlights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProject.bulletPoints.map((bp, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3"
                    >
                      <div className="mt-1 w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{bp}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Tech Stack */}
              <div className="pt-4 border-t border-slate-800">
                <div className="text-xs font-mono text-slate-400 mb-2">Technology & Framework Stack:</div>
                <div className="flex flex-wrap gap-2">
                  {currentProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Architecture & Decisions */}
          {activeTab === 'architecture' && (
            <div className="p-6 md:p-8 space-y-8">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  System Architecture Flow
                </h4>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">{currentProject.architectureSummary}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentProject.architectureSteps.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 relative"
                    >
                      <div className="text-xs font-mono font-bold text-cyan-400">{s.step}</div>
                      <p className="text-xs text-slate-300 leading-relaxed">{s.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Trade-Offs & Decisions */}
              <div className="pt-6 border-t border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
                  Key Technical Trade-offs & Rationale
                </h4>

                <div className="space-y-4">
                  {currentProject.keyDecisions.map((kd, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/90 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-white">{kd.decision}</span>
                        <span className="text-xs font-mono text-slate-500">
                          Replaced: <span className="text-slate-400 line-through">{kd.alternative}</span>
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        <strong className="text-cyan-400">Engineering Rationale:</strong> {kd.why}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Code Snippet */}
          {activeTab === 'code' && (
            <div className="p-6 md:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs text-slate-300">{currentProject.codeSnippet.filename}</span>
                </div>
                <button
                  onClick={() => copyCode(currentProject.codeSnippet.code)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="rounded-xl bg-[#070b14] border border-slate-800/90 p-4 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed">
                <pre>
                  <code>{currentProject.codeSnippet.code}</code>
                </pre>
              </div>

              <p className="text-xs text-slate-400 italic">
                {currentProject.codeSnippet.explanation}
              </p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
