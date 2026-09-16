import React, { useState, useMemo } from 'react';
import { 
  Code, 
  Search, 
  Cpu, 
  Database, 
  Terminal, 
  Layers, 
  CheckCircle2,
  ExternalLink,
  Zap,
  BookOpen
} from 'lucide-react';
import { SKILLS_DATA } from '../data/resumeData';
import { Skill } from '../types';

export const SkillsMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const categories = [
    'All',
    'Languages',
    'Backend',
    'Core Java',
    'Databases',
    'Tools & DevOps',
    'Core CS & Practices',
  ];

  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesQuery = 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.highlight?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.appliedIn.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="font-mono text-xs text-amber-400/80 tracking-widest uppercase mb-2">
              05 / SKILLS
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Technical Arsenal
            </h2>
            <p className="mt-3 text-base text-slate-400 leading-relaxed">
              Specialized backend engineering capabilities directly backed by enterprise production experience and systems implementations.
            </p>
          </div>
          <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-[#1e1c33] via-amber-400/20 to-transparent mb-6" />
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#0d1322] border border-slate-800 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  selectedCategory === cat
                    ? 'bg-cyan-600 text-white font-semibold shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. Concurrency, JDBC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              onClick={() => setActiveSkill(skill)}
              className="p-5 rounded-xl border border-slate-800 bg-[#0d1322] hover:border-cyan-500/60 hover:bg-[#0f172a] transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                    {skill.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h3>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border shrink-0 ${
                  skill.level === 'Advanced' ? 'bg-cyan-950 text-cyan-300 border-cyan-700' :
                  skill.level === 'Proficient' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                  'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {skill.level}
                </span>
              </div>

              {skill.highlight && (
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {skill.highlight}
                </p>
              )}

              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[10px] font-mono text-slate-500 mb-1">Applied In:</div>
                <div className="flex flex-wrap gap-1">
                  {skill.appliedIn.map((app, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for inspect skill */}
        {activeSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#0e1424] border border-cyan-500/40 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">{activeSkill.category}</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{activeSkill.name}</h3>
                </div>
                <button
                  onClick={() => setActiveSkill(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong className="text-cyan-300 block mb-1">Key Concept Coverage:</strong>
                {activeSkill.highlight}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400">Where Shashikumar Applied This:</div>
                <div className="space-y-1.5">
                  {activeSkill.appliedIn.map((place, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200 p-2 rounded bg-slate-900/60 border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{place}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveSkill(null)}
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
