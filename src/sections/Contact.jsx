import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { Panel } from '../components/Panel.jsx';
import { SectionHeader } from '../components/SectionHeader.jsx';
import { profile } from '../data/profile.js';

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 2400);
  };

  return (
    <section id="contact" className="section-pad">
      <SectionHeader kicker="Render Queue" title="Export your next project with Raza" />
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[.85fr_1.15fr]">
        <Panel title="Output Settings" className="p-5 md:p-7" data-reveal>
          <div className="space-y-4">
            <a href={`mailto:${profile.email}`} className="contact-row">
              <FiMail />
              <span>{profile.email}</span>
            </a>
            <a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`} className="contact-row">
              <FiPhone />
              <span>{profile.phone}</span>
            </a>
            <div className="contact-row">
              <FiMapPin />
              <span>{profile.location}</span>
            </div>
          </div>
          <a
            href="/raza_resume.pdf"
            download="raza_resume.pdf"
            className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-cyan/30 bg-cyan/10 px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] text-cyan"
          >
            <FiDownload />
            Resume Download
          </a>
        </Panel>

        <Panel title="Render Message" className="p-5 md:p-7" data-reveal>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input required placeholder="Name" className="input-field" />
              <input required type="email" placeholder="Email" className="input-field" />
            </div>
            <input placeholder="Project type" className="input-field" />
            <textarea required placeholder="Tell Raza about your edit, reel, YouTube video, motion graphic, or color grade." className="input-field min-h-36 resize-none" />
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-premiere via-after to-cyan px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white"
            >
              <span className="relative z-10 inline-flex items-center gap-3">
                <FiSend />
                {sent ? 'Render Sent' : 'Send Render'}
              </span>
              <motion.span className="absolute inset-y-0 left-0 bg-white/20" animate={{ width: sent ? '100%' : '0%' }} />
            </motion.button>
          </form>
        </Panel>
      </div>
    </section>
  );
}
