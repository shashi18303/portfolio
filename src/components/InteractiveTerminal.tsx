import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE_DATA, PROJECTS_DATA, SKILLS_DATA } from '../data/resumeData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'welcome',
      command: 'init',
      output: (
        <div className="space-y-1 text-slate-300 text-xs font-mono">
          <div className="text-cyan-400 font-bold">
            ⚡ Shashikumar Naik - Backend Interactive Shell v2.4 (Java 21 / Spring Boot)
          </div>
          <div className="text-slate-400">
            Type <span className="text-amber-300 font-bold">help</span> to view available system commands, or click the quick command chips below.
          </div>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    const cmd = raw.toLowerCase();
    let resultNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        resultNode = (
          <div className="text-xs space-y-1 font-mono text-slate-300">
            <div className="text-cyan-300 font-semibold mb-1">Available System Commands:</div>
            <div><span className="text-amber-300 w-24 inline-block font-bold">skills</span>: List technical skills and frameworks</div>
            <div><span className="text-amber-300 w-24 inline-block font-bold">projects</span>: Display distributed systems projects</div>
            <div><span className="text-amber-300 w-24 inline-block font-bold">exp</span>: Show work experience at Vstand4U Technologies</div>
            <div><span className="text-amber-300 w-24 inline-block font-bold">contact</span>: Display email, phone, LinkedIn & GitHub</div>
            <div><span className="text-amber-300 w-24 inline-block font-bold">education</span>: Show university degree & certifications</div>
            <div><span className="text-amber-300 w-24 inline-block font-bold">hire</span>: Why Shashikumar is an exceptional backend hire</div>
            <div><span className="text-amber-300 w-24 inline-block font-bold">clear</span>: Clear terminal history</div>
          </div>
        );
        break;

      case 'skills':
        resultNode = (
          <div className="text-xs space-y-2 font-mono text-slate-300">
            <div className="text-cyan-300 font-bold">--- Technical Skills Matrix ---</div>
            <div><strong className="text-emerald-400">Languages:</strong> Java (21, 17, Core), SQL, JavaScript, HTML5/CSS3</div>
            <div><strong className="text-cyan-400">Backend:</strong> Spring Boot, Spring MVC, Spring Data JPA, JDBC, REST APIs, Microservices</div>
            <div><strong className="text-amber-400">Core Java:</strong> OOP, Multithreading, Concurrency, Collections, Streams, Lambdas</div>
            <div><strong className="text-indigo-400">Databases:</strong> PostgreSQL (Locking, ACID), MySQL (Query Tuning)</div>
            <div><strong className="text-rose-400">Tools:</strong> Docker, Git/GitHub, Maven, Postman, JUnit 5, AI-Assisted Dev</div>
          </div>
        );
        break;

      case 'projects':
        resultNode = (
          <div className="text-xs space-y-3 font-mono text-slate-300">
            <div className="text-cyan-300 font-bold">--- Core Projects ---</div>
            {PROJECTS_DATA.map((p) => (
              <div key={p.id} className="p-2 rounded bg-slate-900/80 border border-slate-800">
                <div className="text-white font-bold">{p.title}</div>
                <div className="text-slate-400 text-[11px] mt-0.5">{p.tagline}</div>
                <div className="text-cyan-400 text-[10px] mt-1">Tech: {p.tags.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'exp':
      case 'experience':
        resultNode = (
          <div className="text-xs space-y-2 font-mono text-slate-300">
            <div className="text-cyan-300 font-bold">--- Professional Experience ---</div>
            {EXPERIENCE_DATA.map((e, i) => (
              <div key={i} className="space-y-1">
                <div className="text-white font-bold">{e.role} @ {e.company}</div>
                <div className="text-slate-400">{e.period} | {e.location}</div>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-300 text-[11px]">
                  {e.achievements.slice(0, 3).map((a, j) => (
                    <li key={j}>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        resultNode = (
          <div className="text-xs space-y-1 font-mono text-slate-300">
            <div className="text-cyan-300 font-bold">--- Contact Details ---</div>
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-400 underline">{PERSONAL_INFO.email}</a></div>
            <div>Phone: <span className="text-emerald-400">{PERSONAL_INFO.phone}</span></div>
            <div>Location: {PERSONAL_INFO.location}</div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline">{PERSONAL_INFO.linkedinDisplay}</a></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-slate-200 underline">{PERSONAL_INFO.githubDisplay}</a></div>
          </div>
        );
        break;

      case 'education':
        resultNode = (
          <div className="text-xs space-y-1 font-mono text-slate-300">
            <div className="text-cyan-300 font-bold">--- Education ---</div>
            <div className="text-white font-bold">Bachelor of Engineering in Computer Science</div>
            <div className="text-slate-400">Angadi Institute of Technology and Management | Belagavi (06/2025)</div>
          </div>
        );
        break;

      case 'hire':
        resultNode = (
          <div className="text-xs space-y-2 font-mono text-slate-300 p-2 rounded bg-emerald-950/30 border border-emerald-800/40">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Top 5 Reasons to Hire Shashikumar:</span>
            </div>
            <div className="space-y-1 text-slate-200">
              <div>1. <strong>Production Experience:</strong> 8 months shipping microservices at Vstand4U Technologies.</div>
              <div>2. <strong>Distributed Systems Mastery:</strong> Built leader election failover with PostgreSQL locking and heartbeats.</div>
              <div>3. <strong>Data Structures & Concurrency:</strong> Implemented thread-safe O(1) LRU caching from scratch.</div>
              <div>4. <strong>Database Optimization:</strong> Hands-on tuning MySQL queries using JDBC to cut latency.</div>
              <div>5. <strong>Agile & Quality:</strong> JUnit 5 testing, secure input validation, and clear technical documentation.</div>
            </div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        resultNode = (
          <div className="text-xs font-mono text-rose-400">
            Command not recognized: "{raw}". Type <span className="text-amber-300 font-bold">help</span> to view supported commands.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: raw,
        output: resultNode,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  const quickCommands = ['help', 'skills', 'projects', 'exp', 'hire', 'contact', 'clear'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0b0f1a] border border-cyan-500/50 rounded-xl w-full max-w-3xl h-[550px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-mono">
        
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-[#080d18] border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-200">shashi@backend-shell: ~</span>
            <span className="text-emerald-400 text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 hidden sm:inline">
              LIVE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              {item.command !== 'init' && (
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <span className="text-slate-500">$</span>
                  <span>{item.command}</span>
                </div>
              )}
              <div>{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick Command Chips */}
        <div className="px-4 py-2 bg-[#090e1a] border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-slate-500 mr-1">Quick Run:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-[11px] text-cyan-300 border border-slate-700 transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="px-4 py-3 bg-[#070b14] border-t border-slate-800 flex items-center gap-2">
          <span className="text-cyan-400 font-bold text-sm">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (e.g. skills, projects, hire)..."
            className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono placeholder:text-slate-600"
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="px-2 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs flex items-center gap-1"
          >
            <span>Run</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};
