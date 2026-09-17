import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, Copy, Check, MessageSquare, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/resumeData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [subjectTopic, setSubjectTopic] = useState('Full-Time SDE Backend Role Opportunity');
  const [customSender, setCustomSender] = useState('');
  const [customNote, setCustomNote] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${subjectTopic} - from ${customSender || 'Recruiter/Engineering Lead'}`);
    const body = encodeURIComponent(
      `Hi Shashikumar,\n\nI reviewed your backend engineering portfolio (specifically your experience at Vstand4U Technologies and your Distributed Job Scheduler / LRU Cache projects).\n\n${customNote ? customNote + '\n\n' : ''}We would love to discuss potential opportunities with you.\n\nBest regards,\n${customSender || '[Your Name]'}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-slate-800/80 relative bg-[#090e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end gap-6 mb-12">
          <div>
            <div className="font-mono text-xs text-amber-400/80 tracking-widest uppercase mb-2">
              07 / CONTACT
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Let's Build Something
            </h2>
            <p className="mt-3 text-base text-slate-400 leading-relaxed max-w-2xl">
              I'm currently open to full-time Java/Backend developer roles and interesting projects. Whether you have an opportunity or want to discuss backend systems — my inbox is always open.
            </p>
          </div>
          <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-[#1e1c33] via-amber-400/20 to-transparent mb-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Email Card */}
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0d1322] space-y-3 hover:border-cyan-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-mono text-cyan-400">
                  <Mail className="w-4 h-4" />
                  <span>EMAIL ADDRESS</span>
                </div>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-base font-bold text-white hover:text-cyan-300 transition-colors block break-all font-mono"
              >
                {PERSONAL_INFO.email}
              </a>
              <p className="text-xs text-slate-400">Preferred channel for interview invites & technical discussions.</p>
            </div>

            {/* Direct Phone Card */}
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0d1322] space-y-3 hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-mono text-emerald-400">
                  <Phone className="w-4 h-4" />
                  <span>PHONE & WHATSAPP</span>
                </div>
                <button
                  onClick={copyPhone}
                  className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-emerald-300 transition-colors"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="text-base font-bold text-white hover:text-emerald-300 transition-colors block font-mono"
              >
                {PERSONAL_INFO.phone}
              </a>
              <p className="text-xs text-slate-400">Available Monday–Saturday for phone screens.</p>
            </div>

            {/* Location & Links */}
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0d1322] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>LOCATION</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {PERSONAL_INFO.location}
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2 font-mono text-xs">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn Profile</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-white" />
                    <span>GitHub Profile</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

          </div>

          {/* Interactive Fast Email Dispatcher */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-800 bg-[#0d1322] p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" /> Fast Email Dispatcher
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Draft an instant email directly into your default email client (Gmail, Outlook, Apple Mail).
                </p>
              </div>

              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Subject Topic
                  </label>
                  <select
                    value={subjectTopic}
                    onChange={(e) => setSubjectTopic(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Full-Time SDE Backend Role Opportunity">Full-Time SDE Backend Role Opportunity</option>
                    <option value="Technical Interview / Java Spring Boot Assessment">Technical Interview / Java Spring Boot Assessment</option>
                    <option value="Discussion on Distributed Systems Architecture">Discussion on Distributed Systems Architecture</option>
                    <option value="General Engineering Opportunity Inquiry">General Engineering Opportunity Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Name / Company
                  </label>
                  <input
                    type="text"
                    value={customSender}
                    onChange={(e) => setCustomSender(e.target.value)}
                    placeholder="e.g. Sarah Connor, Tech Lead at Razorpay"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Additional Message or Job Description URL (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Share role details, tech stack expectations, or interview timeline..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-sans leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-send-email-btn"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs sm:text-sm transition-colors shadow-md shadow-cyan-900/30"
                >
                  <Send className="w-4 h-4" />
                  <span>Launch Email in Mail Client</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
