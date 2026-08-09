import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Github, Linkedin, FileText } from 'lucide-react';
import { PROJECTS, GROUPS, type Project } from '@/data/projects';
import Motif from '@/components/work/Motif';
import SiteNav from '@/components/SiteNav';
import AskPanel from '@/components/AskPanel';
import Atmosphere from '@/components/Atmosphere';
import { useReveal } from '@/hooks/useReveal';

const askChat = (q?: string) =>
  window.dispatchEvent(new CustomEvent('open-portfolio-chat', { detail: { q } }));

/* Section that lingers and fades as it exits the top while the next section
   (opaque, painted on top) rises up and covers it — the same feel as the hero. */
const StackSection = ({ id, className = '', children }: { id?: string; className?: string; children: React.ReactNode }) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const h = window.innerHeight || 1;
      // Hand off only once the section is genuinely leaving — i.e. its BOTTOM edge
      // has risen into the top of the viewport. This is height-independent, so a
      // tall section (Work) stays fully visible until you've scrolled all of it.
      const start = h * 0.72;
      if (r.bottom < start) {
        const leave = Math.min(Math.max((start - r.bottom) / start, 0), 1);
        el.style.opacity = String(Math.max(0, 1 - leave * 1.15));   // fade as it is covered
        el.style.transform = `translateY(${leave * h * 0.14}px)`;   // hold it back so the next slides over
      } else {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section ref={ref} id={id} className={className}
      style={{ position: 'relative', background: 'hsl(var(--paper))', willChange: 'opacity, transform' }}>
      {children}
    </section>
  );
};

/* ----------------------- work card grid ----------------------- */
const WorkCard = ({ p }: { p: Project }) => {
  const repo = p.links.find((l) => l.kind === 'repo')?.href;
  return (
    <div style={{ ['--accent' as string]: p.theme.accent }} className="work-card group flex flex-col p-6">
      <Link to={`/work/${p.slug}`} className="flex flex-1 flex-col">
        <div className="flex items-start">
          <span className="h-11 w-11 shrink-0"><Motif id={p.theme.motif} /></span>
        </div>
        <div className="mt-4 serif text-[1.6rem] leading-none text-[hsl(var(--graphite))]">{p.name}</div>
        <p className="serif-i mt-2 text-[15px] leading-snug text-[hsl(var(--accent))]">{p.question}</p>
        <p className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-[hsl(var(--graphite)/0.6)]">{p.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.slice(0, 4).map((t) => <span key={t} className="pill">{t}</span>)}
        </div>
      </Link>
      <div className="mt-5 flex items-center justify-between border-t border-[hsl(var(--hair))] pt-4">
        {repo ? (
          <a href={repo} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-[hsl(var(--graphite)/0.6)] transition-colors hover:text-[hsl(var(--accent))]">
            <Github size={14} /> Code
          </a>
        ) : <span />}
        <Link to={`/work/${p.slug}`}
          className="inline-flex items-center gap-1.5 text-[12.5px] text-[hsl(var(--graphite)/0.6)] transition-colors hover:text-[hsl(var(--accent))]">
          Details <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

const WorkIndexSection = () => (
  <StackSection id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
    <div className="reveal mb-12 flex items-end justify-between gap-4">
      <div>
        <div className="kicker">Some of my projects</div>
        <h2 className="serif mt-3 text-[3rem] leading-none tracking-tight text-[hsl(var(--graphite))] md:text-[4rem]">
          Work.
        </h2>
      </div>
    </div>

    {GROUPS.map((g) => (
      <div key={g.id} className="mb-12">
        <div className="reveal mb-5 text-[11px] uppercase tracking-[0.24em] text-[hsl(var(--dim))]">{g.label}</div>
        <div className="grid gap-4 sm:grid-cols-2">
          {PROJECTS.filter((x) => x.group === g.id).map((x) => <WorkCard key={x.slug} p={x} />)}
        </div>
      </div>
    ))}
  </StackSection>
);

/* --------------------------------- page --------------------------------- */
const enidus = {
  org: 'Enidus USA', when: 'Aug 2025 — Present', role: 'Software Engineer · AI / LLM Platform',
  stats: [['50+', 'tools'], ['442', 'eval queries'], ['89%', 'intent@1'], ['90.3%', 'tool-pick'], ['1→8', 'workers']] as [string, string][],
  points: [
    'Multi-tenant LLM tool-calling backend (FastAPI · OpenAI · Qdrant · SQL Server on Azure) — 50+ database-registered tools, server-side JWT tenant isolation, and role-gated SQL with PII masking.',
    'Nine ReAct workflows (suspend / resume / activate, rate-plan changes, bulk ops, eSIM & SIM ordering, troubleshooting) that collapse 10–12 portal clicks into one command, each human-in-the-loop gated before a state change.',
    'Hybrid retrieval — lexical fast-paths for phone / BAN / ICCID plus Qdrant semantic search (~70% cache hit) — gated by a 442-query eval at 89% intent and 90.3% tool-pick accuracy.',
    'Migrated troubleshooting state from in-memory dicts to a SQL-persisted state machine, scaling 1→8 workers with sessions that survive deploys.',
    'TypeScript OAuth 2.0 + RS256 Proof-of-Possession layer against T-Mobile’s carrier API (~75% coverage), with a legacy-to-PIL compatibility shim.',
  ],
  tags: ['FastAPI', 'OpenAI', 'Qdrant', 'SQL Server', 'TypeScript', 'Azure'],
};

const previous = [
  { org: 'Live Risk Labs', when: 'Jun — Aug 2025', role: 'Software Engineer',
    note: 'Terraform for GCP, CIS-hardened Ansible images, and GitOps with ArgoCD + Checkov policy scanning.' },
  { org: 'Hyphenova', when: 'Jun — Dec 2024', role: 'Software Engineer Intern',
    note: 'React + TypeScript front-end; Redis caching that cut DB load 40%; Docker CI at 85%+ coverage.' },
];

const cardBase = 'rounded-[var(--radius)] border border-[hsl(var(--hair))] bg-[hsl(var(--graphite)/0.02)]';

const education = [
  { degree: 'M.S. Computer Science', school: 'Indiana University Bloomington', meta: '2023 – 2025 · GPA 3.61', logo: '/image.png' },
  { degree: 'B.Tech, Electronics & Telecommunication', school: 'K. J. Somaiya Institute of Technology', meta: '2019 – 2023 · GPA 8.99', logo: '/image2.png' },
];

const Home = () => {
  useReveal();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Ashwin Ugale — AI / LLM Engineer';
    const id = window.location.hash.replace('#', '');
    if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView(), 80);
  }, []);

  // hero pins and fades as the next section rises over it
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = heroRef.current;
        if (!el) return;
        const p = Math.min(window.scrollY / window.innerHeight, 1);
        // dissolve the hero well before the next section reaches center → seamless
        el.style.opacity = String(Math.max(0, 1 - p * 1.9));
        el.style.transform = reduce ? '' : `translateY(${p * -16}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="relative min-h-screen">
      <Atmosphere />
      <SiteNav variant="home" />

      {/* ---------------- hero (pins + fades as content rises over it) ---------------- */}
      <section className="sticky top-0 z-0 flex h-screen items-center">
        <div ref={heroRef} className="mx-auto w-full max-w-6xl px-6 will-change-transform">
          <div className="reveal kicker">AI / LLM Engineer — Enidus USA · New York</div>
          <h1 className="reveal serif mt-5 text-[3.6rem] leading-[0.95] tracking-tight text-[hsl(var(--graphite))] md:text-[6rem]">
            Ashwin Ugale
          </h1>
          <p className="reveal mt-6 max-w-2xl text-[1.5rem] leading-snug text-[hsl(var(--graphite)/0.9)] md:text-[2rem]">
            I build AI systems and the backend infrastructure behind them.
          </p>
          <p className="reveal mt-5 max-w-xl text-[16px] leading-relaxed text-[hsl(var(--graphite)/0.6)]">
            Software engineer at Enidus with a full-stack background, working on RAG chatbots and AI agents.
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center gap-5">
            <button onClick={() => askChat()} className="group inline-flex items-center gap-2 text-[14.5px] text-[hsl(var(--accent))]">
              Ask my portfolio anything
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a href="#work" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="ed-link text-[14.5px]">See my projects</a>
          </div>

        </div>
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.24em] text-[hsl(var(--dim))]">Scroll ↓</div>
      </section>

      {/* content comes in as the hero dissolves — same ink, no visible seam */}
      <div className="relative z-10" style={{ background: 'hsl(var(--paper))' }}>
        <WorkIndexSection />

      {/* ---------------- experience ---------------- */}
      <StackSection className="py-4">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="reveal serif mb-10 text-[2.6rem] leading-none tracking-tight text-[hsl(var(--graphite))] md:text-[3.4rem]">Experience.</h2>

          {/* big Enidus card */}
          <div className={`reveal ${cardBase} p-6 md:p-8`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="serif text-[1.7rem] text-[hsl(var(--graphite))]">{enidus.org}</span>
              <span className="text-[12px] uppercase tracking-wider text-[hsl(var(--dim))]">{enidus.when}</span>
            </div>
            <div className="mt-1 text-[14px] text-[hsl(var(--graphite)/0.6)]">{enidus.role}</div>

            <div className="my-6 grid grid-cols-3 gap-y-5 border-y border-[hsl(var(--hair))] py-5 sm:grid-cols-5">
              {enidus.stats.map(([v, l]) => (
                <div key={l}>
                  <div className="stat-num text-[1.8rem]">{v}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--dim))]">{l}</div>
                </div>
              ))}
            </div>

            <ul className="space-y-3">
              {enidus.points.map((pt, i) => (
                <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-[hsl(var(--graphite)/0.72)]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
                  {pt}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {enidus.tags.map((t) => <span key={t} className="pill">{t}</span>)}
            </div>
          </div>

          {/* previous roles */}
          <div className="reveal mb-4 mt-10 text-[11px] uppercase tracking-[0.24em] text-[hsl(var(--dim))]">Previously</div>
          <div className="grid gap-4 sm:grid-cols-2">
            {previous.map((e) => (
              <div key={e.org} className={`reveal ${cardBase} p-6`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="serif text-[1.3rem] text-[hsl(var(--graphite))]">{e.org}</span>
                  <span className="text-[11px] uppercase tracking-wider text-[hsl(var(--dim))]">{e.when}</span>
                </div>
                <div className="mb-2 mt-0.5 text-[13px] text-[hsl(var(--graphite)/0.55)]">{e.role}</div>
                <p className="text-[13.5px] leading-relaxed text-[hsl(var(--graphite)/0.64)]">{e.note}</p>
              </div>
            ))}
          </div>
        </div>
      </StackSection>

      {/* ---------------- education & certification ---------------- */}
      <StackSection className="scroll-mt-24 py-4">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="reveal serif mb-10 text-[2.4rem] leading-none tracking-tight text-[hsl(var(--graphite))] md:text-[3rem]">Education &amp; certification.</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {education.map((s) => (
              <div key={s.school} className="reveal panel flex items-center gap-4 p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--graphite)/0.06)] p-1.5">
                  <img src={s.logo} alt={s.school} className="h-full w-full object-contain" />
                </span>
                <div>
                  <div className="serif text-[1.15rem] leading-tight text-[hsl(var(--graphite))]">{s.school}</div>
                  <div className="mt-0.5 text-[13px] text-[hsl(var(--graphite)/0.6)]">{s.degree} · {s.meta}</div>
                </div>
              </div>
            ))}
            <a
              href="https://www.credly.com/badges/37dccc3c-462b-48a3-9f36-21e1195b0cf2/public_url"
              target="_blank" rel="noopener noreferrer"
              className="reveal panel flex items-center gap-4 p-5 md:col-span-2"
            >
              <img src="/aws-certified-developer-associate.png" alt="AWS Certified Developer Associate" className="h-14 w-14 shrink-0 object-contain" />
              <div>
                <div className="serif text-[1.15rem] leading-tight text-[hsl(var(--graphite))]">AWS Certified Developer — Associate</div>
                <div className="mt-0.5 text-[13px] text-[hsl(var(--graphite)/0.6)]">Amazon Web Services · 2025 · verify →</div>
              </div>
            </a>
          </div>
        </div>
      </StackSection>

      {/* ---------------- contact ---------------- */}
      <StackSection id="contact" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <div className="reveal kicker">Contact</div>
          <h2 className="reveal serif mt-3 max-w-[14ch] text-[3rem] leading-[1.05] text-[hsl(var(--graphite))] md:text-[4.4rem]">
            Let’s talk.
          </h2>
          <p className="reveal mt-5 max-w-md text-[15.5px] leading-relaxed text-[hsl(var(--graphite)/0.64)]">
            Open to AI/LLM engineering and backend roles. Email is fastest — or ask my portfolio
            assistant anything, day or night.
          </p>
          <div className="reveal mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[15px]">
            <a href="mailto:ugaleashwin@gmail.com" className="ed-link inline-flex items-center gap-2"><Mail size={15} /> ugaleashwin@gmail.com</a>
            <a href="https://linkedin.com/in/ashwin-ugale/" target="_blank" rel="noopener noreferrer" className="ed-link inline-flex items-center gap-2"><Linkedin size={15} /> LinkedIn</a>
            <a href="https://github.com/AshwinUgale" target="_blank" rel="noopener noreferrer" className="ed-link inline-flex items-center gap-2"><Github size={15} /> GitHub</a>
            <a href="/Ashwin_Ugale_resume.pdf" target="_blank" rel="noopener noreferrer" className="ed-link inline-flex items-center gap-2"><FileText size={15} /> Résumé</a>
          </div>
        </div>
      </StackSection>

      <footer>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-[12.5px] text-[hsl(var(--dim))]">
          <span>© {new Date().getFullYear()} Ashwin Ugale</span>
          <span>Built with React, Vite &amp; Tailwind</span>
        </div>
      </footer>
      </div>

      <AskPanel />
    </div>
  );
};

export default Home;
