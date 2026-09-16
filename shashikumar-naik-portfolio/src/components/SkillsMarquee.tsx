import React from 'react';

const SKILLS_LIST = [
  'Java',
  'Spring Boot',
  'PostgreSQL',
  'Distributed Systems',
  'Concurrency & Multithreading',
  'Hibernate',
  'JDBC Batching',
  'REST APIs',
  'MySQL',
  'Docker',
  'Maven',
  'JUnit 5',
  'In-Memory LRU Cache',
  'PostgreSQL Advisory Locks',
  'Microservices',
  'OOP & Clean Architecture',
  'Data Structures & Algorithms',
  'Spring Data JPA',
  'Git & GitHub',
  'Actuator & Metrics'
];

export const SkillsMarquee: React.FC = () => {
  const doubleList = [...SKILLS_LIST, ...SKILLS_LIST];

  return (
    <div className="w-full border-y border-[#181628] bg-[#07060f]/80 backdrop-blur py-3.5 overflow-hidden relative z-20">
      <div className="animate-marquee gap-3 sm:gap-4 items-center">
        {doubleList.map((skill, index) => {
          const isGold = index % 3 === 0;
          const isBlue = index % 3 === 1;
          return (
            <div
              key={`${skill}-${index}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#1e1c33] bg-[#0b0a17]/90 text-xs sm:text-sm font-mono text-slate-300 hover:border-amber-400/50 hover:text-white transition-colors cursor-default whitespace-nowrap"
            >
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  isGold
                    ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                    : isBlue
                    ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]'
                    : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                }`}
              />
              <span>{skill}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
