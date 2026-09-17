import React, { useState, useEffect } from 'react';
import { Server, Activity, Cpu, Database, RefreshCw, AlertCircle, CheckCircle2, ShieldCheck, Terminal, Play, Zap } from 'lucide-react';
import { soundFx } from '../utils/audio';

type DeckTab = 'jvm' | 'cluster' | 'actuator';

interface ClusterNode {
  id: string;
  name: string;
  role: 'LEADER' | 'FOLLOWER';
  status: 'ONLINE' | 'STANDBY' | 'DEGRADED';
  heartbeatMs: number;
  cpu: number;
  ramMb: number;
  activeJobs: number;
}

export const LiveTelemetryDeck: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DeckTab>('jvm');
  const [heapUsage, setHeapUsage] = useState<number>(418);
  const [virtualThreads, setVirtualThreads] = useState<number>(1420);
  const [p99Latency, setP99Latency] = useState<number>(14.2);
  const [actuatorPath, setActuatorPath] = useState<string>('/actuator/health');
  const [actuatorResponse, setActuatorResponse] = useState<any>({
    status: 'UP',
    components: {
      db: { status: 'UP', details: { database: 'PostgreSQL 16.2', validationQuery: 'isValid()' } },
      diskSpace: { status: 'UP', details: { total: 107374182400, free: 78942110720 } },
      lruCache: { status: 'UP', details: { size: 1024, hitRate: 0.941 } },
      scheduler: { status: 'UP', details: { leaderNode: 'backend-node-01', lockAcquired: true } }
    }
  });

  const [clusterNodes, setClusterNodes] = useState<ClusterNode[]>([
    { id: 'node-01', name: 'srv-alpha-01', role: 'LEADER', status: 'ONLINE', heartbeatMs: 12, cpu: 18, ramMb: 420, activeJobs: 6 },
    { id: 'node-02', name: 'srv-beta-02', role: 'FOLLOWER', status: 'STANDBY', heartbeatMs: 14, cpu: 9, ramMb: 380, activeJobs: 0 },
    { id: 'node-03', name: 'srv-gamma-03', role: 'FOLLOWER', status: 'STANDBY', heartbeatMs: 16, cpu: 11, ramMb: 395, activeJobs: 0 }
  ]);

  const [electionLog, setElectionLog] = useState<string>('Leader srv-alpha-01 refreshed PostgreSQL advisory lease [ttl: 3000ms]');

  // Live fluctuating telemetry values
  useEffect(() => {
    const timer = setInterval(() => {
      setHeapUsage((prev) => {
        const delta = (Math.random() - 0.48) * 8;
        return Math.min(680, Math.max(370, Math.round((prev + delta) * 10) / 10));
      });
      setVirtualThreads((prev) => {
        const delta = Math.floor((Math.random() - 0.5) * 20);
        return Math.min(2200, Math.max(900, prev + delta));
      });
      setP99Latency((prev) => {
        const delta = (Math.random() - 0.5) * 0.8;
        return Math.min(24.0, Math.max(9.5, Math.round((prev + delta) * 10) / 10));
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleSimulateFailover = () => {
    soundFx.playBeep(440, 0.1, 'sawtooth');
    // Rotate leader from node-01 to node-02
    setClusterNodes((prev) => {
      const isFirstLeader = prev[0].role === 'LEADER';
      if (isFirstLeader) {
        setElectionLog('WARN: srv-alpha-01 lease expired. srv-beta-02 acquired pg_try_advisory_lock(0x7A4F)!');
        return [
          { ...prev[0], role: 'FOLLOWER', status: 'STANDBY', activeJobs: 0 },
          { ...prev[1], role: 'LEADER', status: 'ONLINE', activeJobs: 8 },
          { ...prev[2], role: 'FOLLOWER', status: 'STANDBY', activeJobs: 0 },
        ];
      } else {
        setElectionLog('INFO: Failback election completed. srv-alpha-01 acquired pg_try_advisory_lock(0x7A4F).');
        return [
          { ...prev[0], role: 'LEADER', status: 'ONLINE', activeJobs: 7 },
          { ...prev[1], role: 'FOLLOWER', status: 'STANDBY', activeJobs: 0 },
          { ...prev[2], role: 'FOLLOWER', status: 'STANDBY', activeJobs: 0 },
        ];
      }
    });
  };

  const handleFetchActuator = (endpoint: string) => {
    soundFx.playClick();
    setActuatorPath(endpoint);
    if (endpoint === '/actuator/health') {
      setActuatorResponse({
        status: 'UP',
        components: {
          db: { status: 'UP', details: { database: 'PostgreSQL 16.2', validationQuery: 'isValid()' } },
          diskSpace: { status: 'UP', details: { total: 107374182400, free: 78942110720 } },
          lruCache: { status: 'UP', details: { size: 1024, hitRate: 0.941 } },
          scheduler: { status: 'UP', details: { leaderNode: 'backend-node-01', lockAcquired: true } }
        }
      });
    } else if (endpoint === '/actuator/metrics/jvm.memory.used') {
      setActuatorResponse({
        name: 'jvm.memory.used',
        description: 'The amount of used memory',
        baseUnit: 'bytes',
        measurements: [{ statistic: 'VALUE', value: heapUsage * 1024 * 1024 }],
        availableTags: [
          { tag: 'area', values: ['heap', 'nonheap'] },
          { tag: 'id', values: ['ZGC Eden Space', 'ZGC Metaspace'] }
        ]
      });
    } else if (endpoint === '/actuator/threads') {
      setActuatorResponse({
        carrierThreads: 12,
        virtualThreadsActive: virtualThreads,
        threadPoolExecutor: {
          activeCount: 8,
          corePoolSize: 10,
          maximumPoolSize: 50,
          completedTaskCount: 19842
        }
      });
    }
  };

  return (
    <div className="rounded-2xl border border-slate-700/80 bg-[#0d1322]/95 backdrop-blur-xl shadow-2xl shadow-cyan-950/20 overflow-hidden transition-all hover:border-cyan-500/50">
      
      {/* Top Header Bar */}
      <div className="px-4 py-3 bg-[#080d18] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/90" />
            <div className="w-3 h-3 rounded-full bg-amber-500/90" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
          </div>
          <span className="text-xs font-mono text-slate-300 ml-2 font-semibold">
            shashi-backend-telemetry.deck
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-700/60 text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SYS_ONLINE
          </span>
          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
            Java 21 LTS
          </span>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center border-b border-slate-800/80 bg-slate-900/40 text-xs font-mono">
        <button
          onClick={() => { soundFx.playClick(); setActiveTab('jvm'); }}
          className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'jvm'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>JVM & Concurrency</span>
        </button>

        <button
          onClick={() => { soundFx.playClick(); setActiveTab('cluster'); }}
          className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'cluster'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          <span>Cluster Topology</span>
        </button>

        <button
          onClick={() => { soundFx.playClick(); setActiveTab('actuator'); }}
          className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'actuator'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Spring Actuator</span>
        </button>
      </div>

      {/* Tab Content Area */}
      <div className="p-5 font-mono text-xs">
        
        {/* TAB 1: JVM & Concurrency Monitor */}
        {activeTab === 'jvm' && (
          <div className="space-y-4">
            
            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400">HEAP USAGE</div>
                <div className="text-base font-bold text-cyan-400 mt-0.5">{heapUsage} MB</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${(heapUsage / 2048) * 100}%` }}
                  />
                </div>
                <div className="text-[9px] text-slate-500 mt-1">Allocated: 2048 MB</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400">VIRTUAL THREADS</div>
                <div className="text-base font-bold text-teal-300 mt-0.5">
                  {virtualThreads.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-[9px] text-emerald-400 mt-1.5">
                  <Zap className="w-3 h-3" />
                  <span>Project Loom Active</span>
                </div>
                <div className="text-[9px] text-slate-500">Carrier: 12 OS threads</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-[10px] text-slate-400">P99 LATENCY</div>
                <div className="text-base font-bold text-emerald-400 mt-0.5">{p99Latency} ms</div>
                <div className="text-[9px] text-slate-500 mt-1.5">GC: ZGC Generational</div>
                <div className="text-[9px] text-cyan-400/80">Avg Pause: &lt; 0.8ms</div>
              </div>
            </div>

            {/* Architectural Specs */}
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2 text-[11px]">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Runtime Target:</span>
                </span>
                <span className="text-cyan-300 font-semibold">OpenJDK 21.0.4 - Linux x86_64</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Database className="w-3.5 h-3.5 text-blue-400" />
                  <span>Database Pooling:</span>
                </span>
                <span className="text-slate-200">HikariCP (20 connections, 30s max lifetime)</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Concurrency Model:</span>
                </span>
                <span className="text-amber-300">ReentrantReadWriteLock + CAS Atomics</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
              <span>JIT Compiler: C2 Tier 4 HotSpot</span>
              <span className="text-emerald-400">0 Memory Leaks Detected</span>
            </div>

          </div>
        )}

        {/* TAB 2: Cluster Topology */}
        {activeTab === 'cluster' && (
          <div className="space-y-3.5">
            
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Distributed Node Leases (PostgreSQL Advisory)</span>
              <button
                onClick={handleSimulateFailover}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-950/60 border border-rose-700/60 text-rose-300 hover:bg-rose-900/60 transition-colors text-[10px]"
                title="Test leader failure and follower automatic election"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Simulate Failover</span>
              </button>
            </div>

            {/* Nodes Stack */}
            <div className="space-y-2">
              {clusterNodes.map((node) => (
                <div
                  key={node.id}
                  className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                    node.role === 'LEADER'
                      ? 'bg-cyan-950/30 border-cyan-500/50 shadow-sm'
                      : 'bg-slate-900/50 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${node.role === 'LEADER' ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`} />
                    <div>
                      <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                        <span>{node.name}</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                          node.role === 'LEADER'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {node.role}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Heartbeat: {node.heartbeatMs}ms • RAM: {node.ramMb}MB • CPU: {node.cpu}%
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-semibold text-emerald-400">
                      {node.status}
                    </div>
                    <div className="text-[9px] text-slate-400">
                      {node.activeJobs} active jobs
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Lease Event Banner */}
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5">
              <span className="text-cyan-400 font-bold">&gt;&gt;</span>
              <span className="truncate">{electionLog}</span>
            </div>

          </div>
        )}

        {/* TAB 3: Spring Boot Actuator */}
        {activeTab === 'actuator' && (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleFetchActuator('/actuator/health')}
                className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                  actuatorPath === '/actuator/health'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                /health
              </button>

              <button
                onClick={() => handleFetchActuator('/actuator/metrics/jvm.memory.used')}
                className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                  actuatorPath === '/actuator/metrics/jvm.memory.used'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                /metrics (heap)
              </button>

              <button
                onClick={() => handleFetchActuator('/actuator/threads')}
                className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                  actuatorPath === '/actuator/threads'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                /threads
              </button>
            </div>

            {/* Actuator JSON Terminal Display */}
            <div className="p-3 rounded-lg bg-[#060a12] border border-slate-800/80 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-[190px] scrollbar-thin">
              <div className="text-slate-500 mb-1 flex items-center justify-between text-[10px]">
                <span>HTTP 200 OK • application/vnd.spring-boot.actuator.v3+json</span>
                <span className="text-cyan-400 font-bold">12ms</span>
              </div>
              <pre>{JSON.stringify(actuatorResponse, null, 2)}</pre>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Deck Footer */}
      <div className="grid grid-cols-3 border-t border-slate-800/90 bg-[#080d18] divide-x divide-slate-800 text-center py-2.5">
        <div>
          <div className="text-xs font-bold text-white font-mono">8+ Mo</div>
          <div className="text-[9px] text-slate-400 uppercase tracking-wider">Enterprise Exp</div>
        </div>
        <div>
          <div className="text-xs font-bold text-cyan-400 font-mono">O(1) / O(log N)</div>
          <div className="text-[9px] text-slate-400 uppercase tracking-wider">Algorithmic Rigor</div>
        </div>
        <div>
          <div className="text-xs font-bold text-emerald-400 font-mono">99.99%</div>
          <div className="text-[9px] text-slate-400 uppercase tracking-wider">Failover Uptime</div>
        </div>
      </div>

    </div>
  );
};
