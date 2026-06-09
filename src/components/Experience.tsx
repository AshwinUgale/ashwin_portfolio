import React from 'react';
import Band from './Band';
import Reveal from './Reveal';

const featured = {
  company: 'Enidus USA',
  role: 'Software Engineer — AI / LLM Platform',
  location: 'Remote, NY (US)',
  dates: 'AUG 2025 — NOW',
  metrics: [
    { v: '50+', l: 'tools' },
    { v: '442', l: 'eval set' },
    { v: '89%', l: 'intent@1' },
    { v: '90.3%', l: 'tool-pick' },
    { v: '1→8', l: 'workers' },
  ],
  stack: ['FastAPI', 'OpenAI', 'Qdrant', 'SQL Server', 'TypeScript', 'Azure'],
  bullets: [
    'Multi-tenant LLM tool-calling backend with 50+ DB-registered tools, server-side JWT tenant isolation, and role-gated SQL with PII masking at the output schema.',
    '9 ReAct workflows (suspend/resume/activate, rate-plan, bulk, eSIM & SIM ordering, troubleshoot) collapsing 10–12 portal clicks into one command, each human-in-the-loop gated.',
    'Hybrid retrieval — lexical fast-paths for phone/BAN/ICCID + Qdrant semantic over text-embedding-3-small (~70% LRU cache) — gated by a 442-query eval at 89% intent top-1 / 90.3% tool-pick.',
    'Migrated troubleshoot state from in-memory dicts to a SQL-persisted state machine (typed transitions, TTL) — 1→8 workers, sessions survive deploys.',
    'TypeScript OAuth 2.0 + RS256 Proof-of-Possession layer for T-Mobile’s PIL carrier API (~75% coverage) with a legacy-to-PIL compatibility shim.',
  ],
};

const timeline = [
  {
    company: 'Live Risk Labs', role: 'Software Engineer', dates: 'JUN — AUG 2025',
    bullets: [
      'Terraform modules for GCP (VPCs, GKE, IAM); CIS-hardened Ansible base images wired into CI.',
      'GitOps deploys with ArgoCD + Checkov policy-as-code scanning on Terraform changes.',
    ],
  },
  {
    company: 'Hyphenova', role: 'Software Engineer Intern', dates: 'JUN — DEC 2024',
    bullets: [
      'Reusable React + TypeScript components (Redux, lazy loading, code splitting).',
      'Redis caching/rate-limiting on Node + MongoDB — cut DB load 40%; GitHub Actions + Docker CI at 85%+ coverage.',
    ],
  },
];

const Experience = () => (
  <Band id="experience" no="02" kicker="experience" title="Where I work.">
    <Reveal>
      <div className="surface ticks p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-display text-2xl font-bold text-white">{featured.company}</h3>
              <span className="tag-accent">● current</span>
            </div>
            <div className="mt-1 font-mono text-sm text-accent" style={{ color: 'hsl(var(--accent))' }}>{featured.role}</div>
            <div className="font-mono text-xs text-white/40">{featured.location}</div>
          </div>
          <span className="font-mono text-xs text-white/40">{featured.dates}</span>
        </div>

        <div className="my-6 grid grid-cols-2 gap-px overflow-hidden border border-white/10 sm:grid-cols-5" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {featured.metrics.map((m) => (
            <div key={m.l} className="bg-[#0c0d10] px-3 py-3 text-center">
              <div className="metric-big text-xl">{m.v}</div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-white/40">{m.l}</div>
            </div>
          ))}
        </div>

        <ul className="space-y-2.5">
          {featured.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-white/70">
              <span className="mt-1.5 font-mono text-xs text-accent" style={{ color: 'hsl(var(--accent))' }}>{String(i + 1).padStart(2, '0')}</span>
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {featured.stack.map((s) => <span key={s} className="tag">{s}</span>)}
        </div>
      </div>
    </Reveal>

    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {timeline.map((exp, i) => (
        <Reveal key={exp.company} delay={i * 100}>
          <div className="surface h-full p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-white">{exp.company}</h3>
              <span className="font-mono text-[11px] text-white/40">{exp.dates}</span>
            </div>
            <div className="mb-3 font-mono text-xs text-accent" style={{ color: 'hsl(var(--accent))' }}>{exp.role}</div>
            <ul className="space-y-1.5">
              {exp.bullets.map((b, j) => (
                <li key={j} className="flex gap-2 text-[13px] leading-relaxed text-white/65">
                  <span className="text-white/30">→</span>{b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>

    <Reveal>
      <div className="mt-5 font-mono text-xs text-white/35">
        <span className="text-white/50">earlier</span> · feuchr school of excellence (data science, 2022) · image online (ml, 2021–22)
      </div>
    </Reveal>
  </Band>
);

export default Experience;
