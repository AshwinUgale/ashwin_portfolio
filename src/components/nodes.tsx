import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '@/data/projects';
import Motif from '@/components/work/Motif';

const L = {
  resume: '/Ashwin_Ugale_resume.pdf',
  email: 'mailto:ugaleashwin@gmail.com',
  github: 'https://github.com/AshwinUgale',
  linkedin: 'https://linkedin.com/in/ashwin-ugale/',
};

const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="ed-link">{children}</a>
);

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="serif mb-6 text-3xl text-[hsl(var(--cream))] md:text-4xl">{children}</h2>
);

const Pills = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-1.5">{items.map((t) => <span key={t} className="pill">{t}</span>)}</div>
);

/* ---------- About ---------- */
export const AboutNode = () => (
  <div>
    <Heading>About</Heading>
    <div className="space-y-4 text-[15px] leading-relaxed text-[hsl(var(--cream)/0.72)]">
      <p>
        I'm a software engineer working on LLM agents and the backend that supports them. At
        <span className="text-[hsl(var(--cream))]"> Enidus</span> I'm building an agent platform for
        T-Mobile for Business — it runs telecom operations through chat, on FastAPI, OpenAI, Qdrant and
        SQL Server, with a person approving anything before it changes a customer's account.
      </p>
      <p>
        My background is full-stack — Node/TypeScript services, API integrations, and SQL databases —
        so the work goes beyond the model layer. I rely on evals to keep quality stable: changes run
        against a labeled test set before they ship, and regressions get reverted.
      </p>
    </div>
    <div className="mt-6">
      <Pills items={['LLM agents', 'Eval-driven RAG', 'Tool-calling', 'Multi-tenant backends', 'OAuth 2.0 + PoP', 'Cloud / CI-CD']} />
    </div>
  </div>
);

/* ---------- Experience ---------- */
const stats = [
  ['50+', 'tools'], ['442', 'eval queries'], ['89%', 'intent@1'], ['90.3%', 'tool-pick'], ['1→8', 'workers'],
];
const enidusBullets = [
  'Multi-tenant LLM tool-calling backend (FastAPI · OpenAI · Qdrant · SQL Server on Azure) — 50+ database-registered tools, server-side JWT tenant isolation, role-gated SQL with PII masking.',
  '9 ReAct workflows (suspend / resume / activate, rate-plan, bulk, eSIM & SIM ordering, troubleshoot) collapsing 10–12 portal clicks into one command, each human-in-the-loop gated.',
  'Hybrid retrieval — lexical fast-paths for phone / BAN / ICCID plus Qdrant semantic search (~70% cache) — gated by a 442-query eval at 89% intent and 90.3% tool-pick.',
  'Migrated troubleshoot state from in-memory dicts to a SQL-persisted state machine — scaled 1→8 workers with sessions that survive deploys.',
  'TypeScript OAuth 2.0 + RS256 Proof-of-Possession layer for T-Mobile’s carrier API (~75% coverage) with a legacy-to-PIL compatibility shim.',
];

export const ExperienceNode = () => (
  <div>
    <Heading>Experience</Heading>

    <div className="panel p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="serif text-2xl text-[hsl(var(--cream))]">Enidus USA</span>
        <span className="text-[12px] uppercase tracking-wider text-[hsl(var(--cream)/0.45)]">Aug 2025 — Present</span>
      </div>
      <div className="mt-1 text-[14px] text-[hsl(var(--cream)/0.6)]">Software Engineer · AI / LLM Platform</div>

      <div className="my-5 grid grid-cols-3 gap-y-4 border-y border-[rgba(236,232,225,0.1)] py-4 sm:grid-cols-5">
        {stats.map(([v, l]) => (
          <div key={l}>
            <div className="stat-num text-[1.7rem]">{v}</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--cream)/0.42)]">{l}</div>
          </div>
        ))}
      </div>

      <ul className="space-y-2.5">
        {enidusBullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-[hsl(var(--cream)/0.72)]">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-5"><Pills items={['FastAPI', 'OpenAI', 'Qdrant', 'SQL Server', 'TypeScript', 'Azure']} /></div>
    </div>

    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      <div className="panel p-5">
        <div className="flex items-baseline justify-between">
          <span className="serif text-xl text-[hsl(var(--cream))]">Live Risk Labs</span>
          <span className="text-[11px] uppercase tracking-wider text-[hsl(var(--cream)/0.42)]">Jun — Aug 2025</span>
        </div>
        <div className="mb-2 text-[12.5px] text-[hsl(var(--cream)/0.55)]">Software Engineer</div>
        <p className="text-[13.5px] leading-relaxed text-[hsl(var(--cream)/0.68)]">
          Terraform for GCP, CIS-hardened Ansible images, and GitOps with ArgoCD + Checkov policy scanning.
        </p>
      </div>
      <div className="panel p-5">
        <div className="flex items-baseline justify-between">
          <span className="serif text-xl text-[hsl(var(--cream))]">Hyphenova</span>
          <span className="text-[11px] uppercase tracking-wider text-[hsl(var(--cream)/0.42)]">Jun — Dec 2024</span>
        </div>
        <div className="mb-2 text-[12.5px] text-[hsl(var(--cream)/0.55)]">Software Engineer Intern</div>
        <p className="text-[13.5px] leading-relaxed text-[hsl(var(--cream)/0.68)]">
          React + TypeScript front-end; Redis caching that cut DB load 40%; Docker CI at 85%+ coverage.
        </p>
      </div>
    </div>
    <p className="mt-4 text-[12.5px] text-[hsl(var(--cream)/0.4)]">
      Earlier — Feuchr School of Excellence (data science, 2022) · Image Online (ML, 2021–22)
    </p>
  </div>
);

/* ---------- Selected work ---------- */
export const ProjectsNode = () => (
  <div>
    <Heading>Projects</Heading>
    <p className="-mt-3 mb-6 max-w-xl text-[14px] leading-relaxed text-[hsl(var(--cream)/0.55)]">
      Eight production AI projects across PyPI, the VS Code Marketplace, and the MCP ecosystem — a
      reliability toolkit and the application it proves itself on. Each opens a full case study.
    </p>

    <a
      href="https://arize.com/blog/agent-traces-without-llm-judge/"
      target="_blank"
      rel="noopener noreferrer"
      className="group mb-6 block rounded-[var(--radius)] border"
      style={{ borderColor: 'hsl(var(--accent)/0.45)', background: 'hsl(var(--accent)/0.06)' }}
    >
      <div className="flex items-center gap-4 p-4">
        <span
          className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em]"
          style={{ background: 'hsl(var(--accent)/0.18)', color: 'hsl(var(--accent))' }}
        >
          Featured
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14.5px] text-[hsl(var(--cream))]">
            “What agent traces can tell you without an LLM judge”
          </div>
          <div className="mt-0.5 text-[12.5px] text-[hsl(var(--cream)/0.6)]">
            Guest post on the Arize AI engineering blog — on <span className="text-[hsl(var(--cream)/0.8)]">tracelint</span>
          </div>
        </div>
        <span className="shrink-0 text-[hsl(var(--cream)/0.5)] transition-colors group-hover:text-[hsl(var(--accent))]">↗</span>
      </div>
    </a>

    <div className="grid gap-4 sm:grid-cols-2">
      {PROJECTS.map((p) => (
        <Link
          key={p.slug}
          to={`/work/${p.slug}`}
          style={{ ['--accent' as string]: p.theme.accent }}
          className="work-card group flex flex-col p-5"
        >
          <div className="flex items-start justify-between gap-2">
            <span className="h-9 w-9 shrink-0"><Motif id={p.theme.motif} /></span>
            <span className="text-[10px] uppercase tracking-wider text-[hsl(var(--cream)/0.42)]">{p.channel}</span>
          </div>
          <div className="mt-3 serif text-xl text-[hsl(var(--cream))]">{p.name}</div>
          <p className="serif-i mt-1 text-[13.5px] leading-snug text-[hsl(var(--accent))]">{p.question}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-[hsl(var(--cream)/0.62)]">{p.tagline}</p>
          <div className="mt-auto flex items-center gap-2 pt-4 text-[12.5px] text-[hsl(var(--cream)/0.55)] transition-colors group-hover:text-[hsl(var(--accent))]">
            Read the case study →
          </div>
        </Link>
      ))}
    </div>
    <Link to="/work" className="ed-link accent mt-6 inline-block text-[13.5px]">View all work →</Link>
  </div>
);

/* ---------- Also built ---------- */
const other = [
  ['Cloud-Native Booking Platform', 'React · Spring Boot on GKE with full CI/CD.', ['Spring Boot', 'GKE'], 'https://github.com/AshwinUgale/CloudNative-BookingPlatform'],
  ['Cloud Deployments Monitoring', 'HTTP/SSL/DNS monitoring on AWS EC2 with Grafana.', ['AWS', 'Grafana'], ''],
  ['Art Gallery Venue Booking', 'MERN app with real-time messaging.', ['MongoDB', 'Socket.io'], 'https://github.com/AshwinUgale/CSCI-P565'],
  ['Hospital Management System', 'Records, scheduling and billing.', ['PHP', 'MySQL'], 'https://github.com/AshwinUgale/HospitalManagementSystem'],
] as const;

export const OtherNode = () => (
  <div>
    <Heading>Other projects</Heading>
    <div className="grid gap-4 sm:grid-cols-2">
      {other.map(([t, d, tags, h]) => (
        <div key={t} className="panel p-5">
          <div className="serif text-lg text-[hsl(var(--cream))]">{h ? <Ext href={h as string}>{t}</Ext> : t}</div>
          <p className="mt-1 text-[13px] leading-relaxed text-[hsl(var(--cream)/0.6)]">{d}</p>
          <div className="mt-3"><Pills items={tags as unknown as string[]} /></div>
        </div>
      ))}
    </div>
    <a href={L.github} target="_blank" rel="noopener noreferrer" className="ed-link mt-5 inline-block text-[13px]">More on GitHub →</a>
  </div>
);

/* ---------- Tools ---------- */
const groups: [string, string[]][] = [
  ['AI / LLM', ['OpenAI', 'Tool-Calling', 'ReAct', 'RAG', 'Hybrid Retrieval', 'Embeddings', 'MCP', 'LangGraph', 'Evals']],
  ['Backend', ['FastAPI', 'Node.js', 'Express', 'REST', 'WebSockets', 'OAuth 2.0 + PoP']],
  ['Data', ['Qdrant', 'pgvector', 'SQL Server', 'PostgreSQL', 'Redis', 'MongoDB', 'BM25']],
  ['Frontend', ['React', 'TypeScript', 'Vite', 'Tailwind']],
  ['Cloud / CI', ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions']],
  ['Languages', ['Python', 'TypeScript', 'SQL', 'Java', 'Go']],
];

export const SkillsNode = () => (
  <div>
    <Heading>Tools</Heading>
    <div className="space-y-5">
      {groups.map(([k, items]) => (
        <div key={k} className="border-t border-[rgba(236,232,225,0.1)] pt-4">
          <div className="mb-2.5 text-[11px] uppercase tracking-[0.22em] text-[hsl(var(--cream)/0.45)]">{k}</div>
          <Pills items={items} />
        </div>
      ))}
    </div>
  </div>
);

/* ---------- Education ---------- */
const schools = [
  { degree: 'M.S. Computer Science', school: 'Indiana University Bloomington', meta: 'GPA 3.61 · 2023–2025', logo: '/image.png' },
  { degree: 'B.Tech Electronics & Telecom', school: 'K. J. Somaiya Institute of Technology', meta: 'GPA 8.99 · 2019–2023', logo: '/image2.png' },
];

export const EducationNode = () => (
  <div>
    <Heading>Education & certification</Heading>
    <div className="space-y-4">
      {schools.map((s) => (
        <div key={s.school} className="panel flex items-center gap-4 p-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-white/[0.06] p-1.5">
            <img src={s.logo} alt={s.school} className="h-full w-full object-contain" />
          </span>
          <div>
            <div className="serif text-lg text-[hsl(var(--cream))]">{s.school}</div>
            <div className="text-[13px] text-[hsl(var(--cream)/0.62)]">{s.degree} · {s.meta}</div>
          </div>
        </div>
      ))}
      <a href="https://www.credly.com/badges/37dccc3c-462b-48a3-9f36-21e1195b0cf2/public_url" target="_blank" rel="noopener noreferrer"
        className="panel flex items-center gap-4 p-5">
        <img src="/aws-certified-developer-associate.png" alt="AWS Certified Developer Associate" className="h-16 w-16 shrink-0 object-contain" />
        <div>
          <div className="serif text-lg text-[hsl(var(--cream))]">AWS Certified Developer — Associate</div>
          <div className="text-[13px] text-[hsl(var(--cream)/0.62)]">Amazon Web Services · 2025 · verify →</div>
        </div>
      </a>
    </div>
  </div>
);

/* ---------- Contact ---------- */
export const ContactNode = ({ onAsk }: { onAsk: () => void }) => (
  <div>
    <Heading>Get in touch</Heading>
    <h3 className="serif text-4xl leading-tight text-[hsl(var(--cream))] md:text-5xl">Let’s talk.</h3>
    <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-[hsl(var(--cream)/0.65)]">
      Open to AI/LLM engineering and backend roles. The fastest way to reach me is email — or ask my
      portfolio assistant anything.
    </p>
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
      <Ext href={L.email}>ugaleashwin@gmail.com</Ext>
      <Ext href={L.linkedin}>LinkedIn</Ext>
      <Ext href={L.github}>GitHub</Ext>
      <button onClick={onAsk} className="ed-link accent">Ask my portfolio →</button>
    </div>
  </div>
);

/* kept for compatibility (unused canvas) */
export const IntroNode = ({ onAsk }: { onAsk: () => void }) => (
  <div>
    <h1 className="serif text-5xl text-[hsl(var(--cream))]">Ashwin Ugale</h1>
    <button onClick={onAsk} className="ed-link accent mt-4 inline-block">Ask my portfolio →</button>
  </div>
);
