import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Server, 
  Database, 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Cpu, 
  ArrowRight, 
  ShieldAlert, 
  RefreshCw,
  Clock,
  Plus,
  Trash2,
  Search,
  Layers,
  ArrowLeftRight
} from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ClusterNodeState {
  id: string;
  name: string;
  role: 'LEADER' | 'FOLLOWER' | 'DEAD';
  heartbeatPulse: number;
  jobsProcessed: number;
  lastHeartbeat: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  message: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
}

interface CacheItem {
  key: string;
  value: string;
  lastAccessed: number;
}

export const ArchitectureLab: React.FC = () => {
  const [activeLab, setActiveLab] = useState<'scheduler' | 'lru'>('scheduler');

  // ==================== LAB 1: DISTRIBUTED SCHEDULER STATE ====================
  const [nodes, setNodes] = useState<ClusterNodeState[]>([
    { id: 'node-1', name: 'Node-1 (US-East)', role: 'LEADER', heartbeatPulse: 100, jobsProcessed: 18, lastHeartbeat: 'Just now' },
    { id: 'node-2', name: 'Node-2 (EU-West)', role: 'FOLLOWER', heartbeatPulse: 100, jobsProcessed: 0, lastHeartbeat: 'Just now' },
    { id: 'node-3', name: 'Node-3 (AP-South)', role: 'FOLLOWER', heartbeatPulse: 100, jobsProcessed: 0, lastHeartbeat: 'Just now' },
  ]);

  const [dbLockHolder, setDbLockHolder] = useState<string>('node-1');
  const [lockTtlSeconds, setLockTtlSeconds] = useState<number>(6);
  const [isAutoHeartbeatActive, setIsAutoHeartbeatActive] = useState<boolean>(true);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', timestamp: '10:20:00', source: 'PostgresLockRepo', message: 'Node-1 acquired distributed lease [lock_key=JOB_SCHEDULER_LOCK, lease_duration=6s]', level: 'SUCCESS' },
    { id: '2', timestamp: '10:20:03', source: 'LeaderElectionService', message: 'Node-1 heartbeat pulse: extended lease in DB', level: 'INFO' },
  ]);

  const addLog = (source: string, message: string, level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS') => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [
      { id: Math.random().toString(), timestamp: time, source, message, level },
      ...prev.slice(0, 24),
    ]);
  };

  // Heartbeat loop timer
  useEffect(() => {
    if (!isAutoHeartbeatActive) return;

    const interval = setInterval(() => {
      const leader = nodes.find((n) => n.role === 'LEADER');
      if (leader) {
        // Leader renews lease
        setLockTtlSeconds(6);
        setNodes((prev) =>
          prev.map((n) =>
            n.id === leader.id
              ? { ...n, heartbeatPulse: (n.heartbeatPulse + 1) % 100, lastHeartbeat: 'Just now' }
              : n
          )
        );
      } else {
        // Leader is DEAD! TTL counts down
        setLockTtlSeconds((prevTtl) => {
          if (prevTtl <= 1) {
            // Lease expired! Followers contest lock
            triggerFailoverContest();
            return 6;
          }
          return prevTtl - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAutoHeartbeatActive, nodes]);

  const triggerFailoverContest = () => {
    soundFx.playSuccess();
    // Find alive followers
    const aliveFollowers = nodes.filter((n) => n.role === 'FOLLOWER');
    if (aliveFollowers.length === 0) {
      addLog('PostgresLockRepo', 'No alive nodes in cluster to contest expired lock.', 'ERROR');
      return;
    }

    // First alive follower wins lock update in Postgres
    const newLeader = aliveFollowers[0];
    setDbLockHolder(newLeader.id);
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === newLeader.id) return { ...n, role: 'LEADER', lastHeartbeat: 'Just now' };
        return n;
      })
    );

    addLog('PostgresLockRepo', `Lease expired! Atomic query UPDATE locks SET leader_id='${newLeader.id}' SUCCEEDED.`, 'WARN');
    addLog('LeaderElectionService', `Failover complete: ${newLeader.name} promoted to LEADER. Resuming background scheduler queue.`, 'SUCCESS');
  };

  const killLeader = () => {
    soundFx.playBeep(320, 0.15, 'sawtooth');
    const currentLeader = nodes.find((n) => n.role === 'LEADER');
    if (!currentLeader) return;

    setNodes((prev) =>
      prev.map((n) => (n.id === currentLeader.id ? { ...n, role: 'DEAD' } : n))
    );
    setDbLockHolder('STALE_LEASE');
    addLog('ClusterMonitor', `CRASH SIMULATION: ${currentLeader.name} process killed unexpectedly (SIGKILL). Heartbeats halted!`, 'ERROR');
    addLog('PostgresLockRepo', `Waiting for PostgreSQL lease timeout threshold (10s lock lease)...`, 'WARN');
  };

  const reviveNode = (nodeId: string) => {
    soundFx.playClick();
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === nodeId) {
          return { ...n, role: 'FOLLOWER', lastHeartbeat: 'Just now' };
        }
        return n;
      })
    );
    const revived = nodes.find((n) => n.id === nodeId);
    addLog('NodeBootstrapper', `${revived?.name || nodeId} restarted. Connected to cluster table; detected active leader, registered as FOLLOWER.`, 'INFO');
  };

  const dispatchJob = () => {
    soundFx.playClick();
    const leader = nodes.find((n) => n.role === 'LEADER');
    if (!leader) {
      addLog('JobDispatcher', 'Cannot dispatch job: Cluster currently has NO ACTIVE LEADER (Failover in progress).', 'ERROR');
      return;
    }

    const jobNames = ['sync-user-database', 'generate-hourly-metrics', 'prune-expired-tokens', 'aggregate-audit-logs'];
    const selectedJob = jobNames[Math.floor(Math.random() * jobNames.length)];
    const jobId = 'job-' + Math.floor(100 + Math.random() * 900);

    setNodes((prev) =>
      prev.map((n) => (n.id === leader.id ? { ...n, jobsProcessed: n.jobsProcessed + 1 } : n))
    );

    addLog('ScheduledExecutor', `Leader [${leader.name}] received and executed [${jobId}: ${selectedJob}] on virtual thread pool.`, 'SUCCESS');
  };

  const resetCluster = () => {
    soundFx.playClick();
    setNodes([
      { id: 'node-1', name: 'Node-1 (US-East)', role: 'LEADER', heartbeatPulse: 100, jobsProcessed: 20, lastHeartbeat: 'Just now' },
      { id: 'node-2', name: 'Node-2 (EU-West)', role: 'FOLLOWER', heartbeatPulse: 100, jobsProcessed: 0, lastHeartbeat: 'Just now' },
      { id: 'node-3', name: 'Node-3 (AP-South)', role: 'FOLLOWER', heartbeatPulse: 100, jobsProcessed: 0, lastHeartbeat: 'Just now' },
    ]);
    setDbLockHolder('node-1');
    setLockTtlSeconds(6);
    addLog('ClusterController', 'Cluster state reset to default configuration.', 'INFO');
  };

  // ==================== LAB 2: LRU CACHE SIMULATOR STATE ====================
  const CACHE_CAPACITY = 4;
  const [cacheItems, setCacheItems] = useState<CacheItem[]>([
    { key: 'session_usr_1', value: 'token_jwt_981', lastAccessed: Date.now() - 3000 },
    { key: 'user_profile_101', value: '{"name":"Alex"}', lastAccessed: Date.now() - 2000 },
    { key: 'config_rate_limit', value: '1000req/min', lastAccessed: Date.now() - 1000 },
  ]);

  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [stats, setStats] = useState({
    hits: 12,
    misses: 2,
    evictions: 3,
  });
  const [cacheMessage, setCacheMessage] = useState<string>('Cache ready. Capacity: 4 items (O(1) GET / PUT).');

  const handlePut = (k: string, v: string) => {
    if (!k.trim()) return;
    const key = k.trim();
    const val = v.trim() || 'val_' + Math.floor(Math.random() * 1000);

    const existingIndex = cacheItems.findIndex((item) => item.key === key);

    if (existingIndex !== -1) {
      // Key exists: update value and move to Head (MRU)
      const updated = [...cacheItems];
      const [existing] = updated.splice(existingIndex, 1);
      existing.value = val;
      existing.lastAccessed = Date.now();
      updated.unshift(existing);
      setCacheItems(updated);
      setCacheMessage(`[PUT] Updated key "${key}". Spliced and promoted to MRU Head in O(1) time.`);
    } else {
      // New key
      let updated = [...cacheItems];
      let evicted: CacheItem | null = null;

      if (updated.length >= CACHE_CAPACITY) {
        // Evict LRU from Tail
        evicted = updated.pop() || null;
        setStats((s) => ({ ...s, evictions: s.evictions + 1 }));
      }

      const newItem: CacheItem = { key, value: val, lastAccessed: Date.now() };
      updated.unshift(newItem); // add to MRU Head
      setCacheItems(updated);

      if (evicted) {
        setCacheMessage(`[PUT] Capacity (4) exceeded. Evicted least-recently-used node "${evicted.key}" from Tail. Inserted "${key}" at Head.`);
      } else {
        setCacheMessage(`[PUT] Inserted new node "${key}" at MRU Head. Current capacity: ${updated.length}/${CACHE_CAPACITY}.`);
      }
    }

    setInputKey('');
    setInputValue('');
  };

  const handleGet = (k: string) => {
    if (!k.trim()) return;
    const key = k.trim();
    const index = cacheItems.findIndex((item) => item.key === key);

    if (index !== -1) {
      // Cache HIT: promote node to Head (MRU)
      const updated = [...cacheItems];
      const [item] = updated.splice(index, 1);
      item.lastAccessed = Date.now();
      updated.unshift(item);
      setCacheItems(updated);
      setStats((s) => ({ ...s, hits: s.hits + 1 }));
      setCacheMessage(`[CACHE HIT] Found "${key}" -> "${item.value}". Moved to MRU Head in O(1) time.`);
    } else {
      // Cache MISS
      setStats((s) => ({ ...s, misses: s.misses + 1 }));
      setCacheMessage(`[CACHE MISS] Key "${key}" not found in HashMap.`);
    }
  };

  const handleDelete = (k: string) => {
    if (!k.trim()) return;
    const key = k.trim();
    const index = cacheItems.findIndex((item) => item.key === key);

    if (index !== -1) {
      const updated = [...cacheItems];
      updated.splice(index, 1);
      setCacheItems(updated);
      setCacheMessage(`[DELETE] Removed node "${key}" from Doubly Linked List & HashMap.`);
    } else {
      setCacheMessage(`[DELETE] Key "${key}" does not exist.`);
    }
  };

  const hitRatio = stats.hits + stats.misses > 0 
    ? ((stats.hits / (stats.hits + stats.misses)) * 100).toFixed(1) 
    : '0.0';

  return (
    <section id="architecture-lab" className="py-16 md:py-24 border-t border-slate-800/80 relative bg-gradient-to-b from-[#090e1a] to-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="font-mono text-xs text-amber-400/80 tracking-widest uppercase mb-2">
              SYSTEMS LABORATORY
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Architecture Lab
            </h2>
            <p className="mt-2 text-base text-slate-400 max-w-3xl">
              Simulate live distributed failover and thread-safe LRU cache evictions replicating the exact backend mechanics built in Shashikumar's projects.
            </p>
          </div>

          {/* Mode switch pills */}
          <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
            <button
              id="lab-tab-scheduler"
              onClick={() => setActiveLab('scheduler')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                activeLab === 'scheduler'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Distributed Leader Election</span>
            </button>
            <button
              id="lab-tab-lru"
              onClick={() => setActiveLab('lru')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                activeLab === 'lru'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>O(1) LRU Cache Engine</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAB 1: DISTRIBUTED LEADER ELECTION SIMULATOR */}
        {/* ========================================================================= */}
        {activeLab === 'scheduler' && (
          <div className="space-y-6">
            
            {/* Control Bar */}
            <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  id="scheduler-kill-leader-btn"
                  onClick={killLeader}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-mono font-semibold transition-colors shadow-sm"
                  title="Simulate crash of the active leader node"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Kill Active Leader</span>
                </button>

                <button
                  id="scheduler-dispatch-job-btn"
                  onClick={dispatchJob}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-mono font-semibold transition-colors shadow-sm"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Dispatch Scheduled Job</span>
                </button>

                <button
                  id="scheduler-reset-btn"
                  onClick={resetCluster}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Cluster</span>
                </button>
              </div>

              {/* PostgreSQL Lock Status Indicator */}
              <div className="flex items-center gap-3 bg-slate-900/90 px-3.5 py-2 rounded-lg border border-slate-800 font-mono text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PostgreSQL Lock:</span>
                </div>
                <span className="font-semibold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                  {dbLockHolder}
                </span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  Lease TTL: <strong className="text-white">{lockTtlSeconds}s</strong>
                </span>
              </div>
            </div>

            {/* Nodes Visual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {nodes.map((node) => {
                const isLeader = node.role === 'LEADER';
                const isDead = node.role === 'DEAD';

                return (
                  <div
                    key={node.id}
                    className={`rounded-xl border p-5 transition-all relative overflow-hidden ${
                      isLeader
                        ? 'bg-cyan-950/20 border-cyan-500/80 shadow-lg shadow-cyan-950/40'
                        : isDead
                        ? 'bg-rose-950/10 border-rose-900/80 opacity-70'
                        : 'bg-[#0d1322] border-slate-800'
                    }`}
                  >
                    {/* Top status header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Server className={`w-4 h-4 ${isLeader ? 'text-cyan-400' : isDead ? 'text-rose-400' : 'text-slate-400'}`} />
                        <span className="font-mono text-xs font-semibold text-slate-200">{node.name}</span>
                      </div>

                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                          isLeader
                            ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                            : isDead
                            ? 'bg-rose-950 text-rose-300 border-rose-800'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {node.role}
                      </span>
                    </div>

                    {/* Node statistics */}
                    <div className="space-y-2 font-mono text-xs text-slate-400 mb-5">
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
                        <span>Node ID:</span>
                        <span className="text-slate-300">{node.id}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
                        <span>Heartbeat State:</span>
                        <span className={isDead ? 'text-rose-400 font-semibold' : 'text-emerald-400 flex items-center gap-1'}>
                          {!isDead && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                          {isDead ? 'HALTED (UNRESPONSIVE)' : 'Pulsing (every 3s)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Jobs Handled:</span>
                        <span className="text-white font-bold">{node.jobsProcessed}</span>
                      </div>
                    </div>

                    {/* Action button inside card */}
                    {isDead ? (
                      <button
                        onClick={() => reviveNode(node.id)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white font-mono text-xs font-semibold transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Revive Node</span>
                      </button>
                    ) : isLeader ? (
                      <div className="py-2 px-3 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-center font-mono text-xs text-cyan-300">
                        ⚡ Currently Executing Distributed Jobs
                      </div>
                    ) : (
                      <div className="py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono text-xs text-slate-500">
                        Standby Follower (Monitoring Lease)
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Live Event Stream Log */}
            <div className="rounded-xl border border-slate-800 bg-[#070b14] overflow-hidden">
              <div className="px-4 py-2.5 bg-[#090e1a] border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  Cluster Event Stream (PostgreSQL Locking & Heartbeats)
                </span>
                <span className="text-[11px] text-slate-500">Auto-scrolling</span>
              </div>

              <div className="p-4 max-h-48 overflow-y-auto space-y-1.5 font-mono text-xs">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                    <span className={`shrink-0 font-semibold px-1 rounded text-[10px] ${
                      log.level === 'SUCCESS' ? 'text-emerald-400 bg-emerald-950/60' :
                      log.level === 'WARN' ? 'text-amber-400 bg-amber-950/60' :
                      log.level === 'ERROR' ? 'text-rose-400 bg-rose-950/60' :
                      'text-cyan-400 bg-cyan-950/60'
                    }`}>
                      {log.source}
                    </span>
                    <span className={
                      log.level === 'SUCCESS' ? 'text-emerald-300' :
                      log.level === 'WARN' ? 'text-amber-200' :
                      log.level === 'ERROR' ? 'text-rose-300' :
                      'text-slate-300'
                    }>
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* LAB 2: LRU CACHE SIMULATOR */}
        {/* ========================================================================= */}
        {activeLab === 'lru' && (
          <div className="space-y-6">
            
            {/* Top Metrics & Status Header */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Cache Hits</div>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{stats.hits}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">O(1) Hash Map lookup</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Cache Misses</div>
                <div className="text-2xl font-bold font-mono text-amber-400 mt-1">{stats.misses}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Key not in memory</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Hit Ratio</div>
                <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">{hitRatio}%</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Efficiency percentage</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Evictions (LRU)</div>
                <div className="text-2xl font-bold font-mono text-rose-400 mt-1">{stats.evictions}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Purged from Tail</div>
              </div>
            </div>

            {/* Interactive Operations Form */}
            <div className="p-5 rounded-xl bg-[#0d1322] border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  id="lru-input-key"
                  type="text"
                  placeholder="Key (e.g. user:42)"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 min-w-[150px]"
                />
                <input
                  id="lru-input-value"
                  type="text"
                  placeholder="Value (e.g. payload_abc)"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 min-w-[180px]"
                />

                <button
                  id="lru-put-btn"
                  onClick={() => handlePut(inputKey, inputValue)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>PUT (O(1))</span>
                </button>

                <button
                  id="lru-get-btn"
                  onClick={() => handleGet(inputKey)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>GET (O(1))</span>
                </button>

                <button
                  id="lru-delete-btn"
                  onClick={() => handleDelete(inputKey)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>DELETE</span>
                </button>

                {/* Preset quick test chips */}
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">Quick Presets:</span>
                  <button
                    onClick={() => handlePut('auth_token_49', 'jwt_val_valid')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-cyan-300 border border-slate-700"
                  >
                    + Put Token
                  </button>
                  <button
                    onClick={() => handlePut('heavy_dataset', '{"rows": 5000}')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-rose-300 border border-slate-700"
                  >
                    + Trigger Eviction
                  </button>
                </div>
              </div>

              {/* Status feedback message */}
              <div className="p-3 rounded-lg bg-[#070b14] border border-slate-800 font-mono text-xs text-cyan-300 flex items-center justify-between">
                <span>{cacheMessage}</span>
                <span className="text-slate-500 text-[11px]">Capacity: {cacheItems.length} / {CACHE_CAPACITY}</span>
              </div>
            </div>

            {/* Visual Doubly Linked List Pipeline */}
            <div className="p-6 rounded-xl bg-[#0d1322] border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4 text-cyan-400" />
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Doubly Linked List Structure (Head to Tail)
                  </h4>
                </div>
                <div className="text-xs font-mono text-slate-500">
                  Head = Most Recently Used (MRU) | Tail = Least Recently Used (LRU)
                </div>
              </div>

              {/* List Visualizer */}
              <div className="flex flex-wrap md:flex-nowrap items-center gap-3 overflow-x-auto pb-4 pt-2">
                {/* Dummy Head */}
                <div className="shrink-0 p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/60 text-center min-w-[100px]">
                  <div className="text-[10px] font-mono text-cyan-400 font-bold">DUMMY HEAD</div>
                  <div className="text-[10px] text-slate-400 mt-1">MRU Anchor</div>
                </div>

                <div className="text-cyan-400 font-mono text-sm shrink-0">⇄</div>

                {/* Real Nodes in DLL order */}
                {cacheItems.map((item, idx) => (
                  <React.Fragment key={item.key}>
                    <div
                      className={`shrink-0 p-3.5 rounded-lg border transition-all min-w-[160px] ${
                        idx === 0
                          ? 'bg-cyan-950/30 border-cyan-500 shadow-md shadow-cyan-950/40'
                          : idx === cacheItems.length - 1 && cacheItems.length === CACHE_CAPACITY
                          ? 'bg-rose-950/20 border-rose-700/80'
                          : 'bg-slate-900 border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className={idx === 0 ? 'text-cyan-400 font-bold' : 'text-slate-400'}>
                          {idx === 0 ? '★ MRU (Head)' : idx === cacheItems.length - 1 ? '⚠ LRU (Tail)' : `Node #${idx + 1}`}
                        </span>
                        <button
                          onClick={() => handleGet(item.key)}
                          className="hover:text-cyan-400 text-slate-500 text-[10px]"
                          title="Touch item"
                        >
                          Touch
                        </button>
                      </div>
                      <div className="text-xs font-bold text-white font-mono truncate">{item.key}</div>
                      <div className="text-[11px] text-slate-400 font-mono truncate mt-0.5">{item.value}</div>
                    </div>

                    {idx < cacheItems.length - 1 && (
                      <div className="text-slate-600 font-mono text-sm shrink-0">⇄</div>
                    )}
                  </React.Fragment>
                ))}

                <div className="text-cyan-400 font-mono text-sm shrink-0">⇄</div>

                {/* Dummy Tail */}
                <div className="shrink-0 p-3 rounded-lg bg-rose-950/30 border border-rose-800/60 text-center min-w-[100px]">
                  <div className="text-[10px] font-mono text-rose-400 font-bold">DUMMY TAIL</div>
                  <div className="text-[10px] text-slate-400 mt-1">LRU Anchor</div>
                </div>
              </div>

              {/* HashMap index reference mapping */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-xs font-mono text-slate-400 mb-2.5 flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ConcurrentHashMap Direct Pointers:</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {cacheItems.map((item) => (
                    <div
                      key={item.key}
                      className="p-2.5 rounded bg-slate-900/60 border border-slate-800 font-mono text-[11px] flex items-center justify-between"
                    >
                      <span className="text-cyan-300 truncate mr-2">"{item.key}"</span>
                      <span className="text-slate-500 shrink-0">→ NodePtr</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
