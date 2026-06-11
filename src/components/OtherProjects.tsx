import React from 'react';
import { Github, ExternalLink, ArrowUpRight, Cloud, Activity, Boxes, Database, PiggyBank, type LucideIcon } from 'lucide-react';
import Band from './Band';
import Reveal from './Reveal';

type Proj = { title: string; icon: LucideIcon; desc: string; tags: string[]; live?: string; code?: string };

const projects: Proj[] = [
  { title: 'Cloud-Native Booking Platform', icon: Cloud, desc: 'React + Node + Spring Boot on GKE with Docker and a full GitHub Actions CI/CD pipeline.', tags: ['Spring Boot', 'GKE', 'Docker'], live: 'http://cloudtix.xyz/', code: 'https://github.com/AshwinUgale/CloudNative-BookingPlatform' },
  { title: 'Cloud Deployments Monitoring', icon: Activity, desc: 'Real-time HTTP / SSL / DNS monitoring on AWS EC2, visualized with Grafana + Prometheus.', tags: ['AWS EC2', 'Grafana', 'Prometheus'] },
  { title: 'Art Gallery Venue Booking', icon: Boxes, desc: 'MERN app for gallery reservations with Socket.io messaging and an admin dashboard.', tags: ['MongoDB', 'Express', 'Socket.io'], code: 'https://github.com/AshwinUgale/CSCI-P565' },
  { title: 'Hospital Management System', icon: Database, desc: 'Full-stack system centralizing registration, scheduling, inventory and billing.', tags: ['PHP', 'JS', 'MySQL'], code: 'https://github.com/AshwinUgale/HospitalManagementSystem' },
  { title: 'AWS Cost Optimization Suite', icon: PiggyBank, desc: 'Dashboard tracking free-tier usage and cloud spend to keep deployments cheap.', tags: ['AWS Lambda', 'CloudWatch', 'Python'] },
];

const OtherProjects = () => (
  <Band id="other" no="04" kicker="other work" title="Full-stack & cloud.">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => {
        const Icon = p.icon;
        return (
          <Reveal key={p.title} delay={i * 60}>
            <div className="surface group flex h-full flex-col p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/60 transition-colors group-hover:text-accent" style={{ borderRadius: '5px' }}>
                  <Icon size={16} />
                </span>
                <div className="flex gap-2.5 font-mono text-[11px]">
                  {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer" aria-label="Code" className="text-white/45 hover:text-accent"><Github size={14} /></a>}
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label="Live" className="text-white/45 hover:text-accent"><ExternalLink size={14} /></a>}
                </div>
              </div>
              <h3 className="font-display text-base font-semibold leading-snug text-white">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/55">{p.desc}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </Reveal>
        );
      })}

      <Reveal delay={projects.length * 60}>
        <a href="https://github.com/AshwinUgale" target="_blank" rel="noopener noreferrer"
          className="surface group flex h-full min-h-[150px] flex-col items-center justify-center gap-2 p-5 text-center">
          <ArrowUpRight size={22} className="text-white/45 transition-colors group-hover:text-accent" />
          <span className="font-display text-sm font-semibold text-white">More on GitHub</span>
          <span className="font-mono text-[11px] text-white/40">github.com/AshwinUgale</span>
        </a>
      </Reveal>
    </div>
  </Band>
);

export default OtherProjects;
