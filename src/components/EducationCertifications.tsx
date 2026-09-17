import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle, BookOpen } from 'lucide-react';
import { EDUCATION_DATA, CERTIFICATIONS_DATA } from '../data/resumeData';

export const EducationCertifications: React.FC = () => {
  return (
    <section id="education" className="py-16 md:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="font-mono text-xs text-amber-400/80 tracking-widest uppercase mb-2">
              06 / CREDENTIALS
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Education &amp; Certifications
            </h2>
            <p className="mt-3 text-base text-slate-400 leading-relaxed">
              B.E. Computer Science from Angadi Institute of Technology (7.7 CGPA) coupled with verified industry certifications in Java Full Stack and Enterprise Architecture.
            </p>
          </div>
          <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-[#1e1c33] via-amber-400/20 to-transparent mb-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Education Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" /> Academic Degree
            </h3>

            {EDUCATION_DATA.map((edu, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-[#0d1322] p-6 md:p-7 space-y-4 hover:border-slate-700 transition-colors shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                  <div>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                      UNDERGRADUATE DEGREE
                    </span>
                    <h4 className="text-lg font-bold text-white mt-2">{edu.degree}</h4>
                    <p className="text-sm text-cyan-400 font-medium mt-0.5">{edu.institution}</p>
                  </div>
                  {edu.cgpa && (
                    <div className="text-center px-3.5 py-2 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-400 font-mono">
                      <div className="text-lg font-bold">{edu.cgpa}</div>
                      <div className="text-[10px] uppercase text-amber-500/80">Cumulative GPA</div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {edu.year}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {edu.location}
                  </span>
                </div>

                <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {edu.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" /> Professional Certifications & Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATIONS_DATA.map((cert, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-[#0d1322] p-5 space-y-3 hover:border-slate-700 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-800/50 inline-block">
                        {cert.issuer}
                      </span>
                      {cert.year && (
                        <span className="text-[10px] font-mono text-slate-500">
                          {cert.year}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>Verified Credential</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
