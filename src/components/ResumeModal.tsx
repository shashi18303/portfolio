import React, { useState } from 'react';
import { X, Printer, Copy, Check, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE_DATA, PROJECTS_DATA, SKILLS_DATA, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../data/resumeData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const copyMarkdown = () => {
    const md = `
# ${PERSONAL_INFO.name.toUpperCase()}
${PERSONAL_INFO.email} | ${PERSONAL_INFO.phone} | ${PERSONAL_INFO.location} | ${PERSONAL_INFO.linkedinDisplay} | ${PERSONAL_INFO.githubDisplay}

## PROFESSIONAL SUMMARY
${PERSONAL_INFO.summary}

## TECHNICAL SKILLS
- **Languages:** Java, JavaScript, SQL, HTML5, CSS3
- **Backend:** Spring Boot, Spring MVC, Spring Data JPA, JDBC, REST APIs, Microservices
- **Core Java:** OOP, Collections, Exception Handling, Multithreading, Concurrency, Streams, Lambda
- **Databases:** PostgreSQL, MySQL
- **Tools:** Git, GitHub, Maven, Docker, Postman, JUnit, AI-assisted development (Claude, Copilot)
- **Core CS:** DSA, DBMS, Operating Systems, Computer Networks
- **Practices:** Agile/Scrum, Code Review, Secure Coding, Unit Testing, Technical Documentation

## EXPERIENCE
**Java Intern**, Vstand4U Technologies Private limited (07/2025 – 02/2026 | Bengaluru, India)
${EXPERIENCE_DATA[0].achievements.map((a) => `- ${a}`).join('\n')}

## PROJECTS
**Distributed Job Scheduler with Leader Election** (Java 21, Spring Boot, Spring Data JPA, REST APIs, PostgreSQL, Multithreading, Concurrency, Distributed Systems, Docker, Maven, Git, JUnit)
${PROJECTS_DATA[0].bulletPoints.map((bp) => `- ${bp}`).join('\n')}

**In-Memory Key-Value Store with LRU Eviction** (Java, Spring Boot, HashMap, REST APIs, Docker)
${PROJECTS_DATA[1].bulletPoints.map((bp) => `- ${bp}`).join('\n')}

## EDUCATION
**Bachelor of Engineering in Computer Science**, Angadi Institute of Technology and Management (06/2025 | Belagavi) — **CGPA: 7.7 / 10**

## CERTIFICATIONS
- Full Stack Java Development — Coursera (2025)
- Enterprise Application Development — IBM / ROOMAN / Skill India (2025)
- Web Development Fundamentals — W3Schools Certification (2024)
- 6-Month Hands-on Experience Certificate — VStand4u Solutions (2025)
- Professional Skills: Life Skills (Jeevan Kaushal 2.0) — Rooman Technologies (2024)
    `.trim();

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Modal Toolbar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white font-mono">Resume Document Viewer</span>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
              ATS-Optimized
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
              title="Copy as clean text/markdown"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied MD' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Document Preview (Clean White/Paper style for authentic resume reading) */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto bg-slate-950/60">
          <div className="bg-white text-slate-900 rounded-lg p-8 sm:p-12 shadow-xl max-w-3xl mx-auto font-sans leading-relaxed text-xs sm:text-sm">
            
            {/* Header */}
            <div className="border-b-2 border-slate-800 pb-4 mb-5 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
                {PERSONAL_INFO.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-700 mt-2 font-medium">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline">{PERSONAL_INFO.email}</a>
                <span>|</span>
                <span>{PERSONAL_INFO.phone}</span>
                <span>|</span>
                <span>{PERSONAL_INFO.location}</span>
                <span>|</span>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:underline text-blue-700">
                  {PERSONAL_INFO.linkedinDisplay}
                </a>
                <span>|</span>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:underline text-slate-800">
                  {PERSONAL_INFO.githubDisplay}
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <section className="mb-5">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-slate-800 text-xs leading-relaxed text-justify">
                {PERSONAL_INFO.summary}
              </p>
            </section>

            {/* Technical Skills */}
            <section className="mb-5">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                Technical Skills
              </h2>
              <div className="text-xs space-y-1 text-slate-800">
                <p><strong>Languages —</strong> Java, JavaScript, SQL, HTML5, CSS3</p>
                <p><strong>Backend —</strong> Spring Boot, Spring MVC, Spring Data JPA, JDBC, REST APIs, Microservices</p>
                <p><strong>Core Java —</strong> OOP, Collections, Exception Handling, Multithreading, Concurrency, Streams, Lambda</p>
                <p><strong>Databases —</strong> PostgreSQL, MySQL</p>
                <p><strong>Tools —</strong> Git, GitHub, Maven, Docker, Postman, JUnit, AI-assisted development (Claude, Copilot)</p>
                <p><strong>Core CS —</strong> DSA, DBMS, Operating Systems, Computer Networks</p>
                <p><strong>Practices —</strong> Agile/Scrum, Code Review, Secure Coding, Unit Testing, Technical Documentation</p>
              </div>
            </section>

            {/* Experience */}
            <section className="mb-5">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                Experience
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between font-bold text-xs sm:text-sm text-slate-900">
                    <span>Java Intern, Vstand4U Technologies Private limited</span>
                    <span className="font-normal text-xs text-slate-700">07/2025 – 02/2026 | Bengaluru, India</span>
                  </div>
                  <ul className="list-disc pl-4 mt-1.5 space-y-1 text-xs text-slate-800">
                    {EXPERIENCE_DATA[0].achievements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section className="mb-5">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                Projects
              </h2>
              <div className="space-y-4">
                {/* Project 1 */}
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    Distributed Job Scheduler with Leader Election
                  </div>
                  <div className="text-[11px] text-slate-600 italic">
                    Java 21, Spring Boot, Spring Data JPA, REST APIs, PostgreSQL, Multithreading, Concurrency, Distributed Systems, Docker, Maven, Git, JUnit
                  </div>
                  <ul className="list-disc pl-4 mt-1 space-y-1 text-xs text-slate-800">
                    {PROJECTS_DATA[0].bulletPoints.map((bp, i) => (
                      <li key={i}>{bp}</li>
                    ))}
                  </ul>
                </div>

                {/* Project 2 */}
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    In-Memory Key-Value Store with LRU Eviction
                  </div>
                  <div className="text-[11px] text-slate-600 italic">
                    Java, Spring Boot, HashMap, REST APIs, Docker
                  </div>
                  <ul className="list-disc pl-4 mt-1 space-y-1 text-xs text-slate-800">
                    {PROJECTS_DATA[1].bulletPoints.map((bp, i) => (
                      <li key={i}>{bp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="mb-5">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                Education
              </h2>
              <div className="flex flex-wrap items-baseline justify-between text-xs text-slate-900">
                <span className="font-bold">Bachelor of Engineering in Computer Science, Angadi Institute of Technology &amp; Management</span>
                <span className="text-slate-700">Graduated: 06/2025 | Belagavi (CGPA: 7.7 / 10)</span>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                Certifications
              </h2>
              <div className="text-xs text-slate-800 space-y-1">
                <p>• <strong>Full Stack Java Development</strong> — Coursera (2025)</p>
                <p>• <strong>Enterprise Application Development</strong> — IBM / ROOMAN / Skill India (2025)</p>
                <p>• <strong>Web Development Fundamentals</strong> — W3Schools Certification (2024)</p>
                <p>• <strong>6-Month Hands-on Experience Certificate</strong> — VStand4u Solutions (2025)</p>
                <p>• <strong>Professional Skills: Life Skills (Jeevan Kaushal 2.0)</strong> — Rooman Technologies (2024)</p>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
};
