import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Github, Package, BookOpen, Play, Terminal } from 'lucide-react';
import { bySlug, type ProjLink } from '@/data/projects';
import Motif from '@/components/work/Motif';
import CodeBlock from '@/components/work/CodeBlock';
import SiteNav from '@/components/SiteNav';
import AskPanel from '@/components/AskPanel';
import { useReveal } from '@/hooks/useReveal';
import NotFound from './NotFound';

const linkIcon = (k: ProjLink['kind']) => {
  const p = { size: 13 };
  if (k === 'repo') return <Github {...p} />;
  if (k === 'pkg') return <Package {...p} />;
  if (k === 'docs') return <BookOpen {...p} />;
  if (k === 'demo') return <Play {...p} />;
  return <ArrowUpRight {...p} />;
};

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <section className="reveal border-t border-[hsl(var(--hair))] pt-8">
    <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">{label}</div>
    {children}
  </section>
);

const Bullets = ({ items, muted = false }: { items: string[]; muted?: boolean }) => (
  <ul className="space-y-3">
    {items.map((b, i) => (
      <li key={i} className={`flex gap-3 text-[14.5px] leading-relaxed ${muted ? 'text-[hsl(var(--graphite)/0.58)]' : 'text-[hsl(var(--graphite)/0.76)]'}`}>
        {muted
          ? <span className="mt-2.5 h-px w-4 shrink-0 bg-[hsl(var(--graphite)/0.3)]" />
          : <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'hsl(var(--accent))' }} />}
        {b}
      </li>
    ))}
  </ul>
);

const ProjectPage = () => {
  const { slug } = useParams();
  const p = slug ? bySlug(slug) : undefined;
  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (p) document.title = `${p.name} — Ashwin Ugale`;
  }, [p]);

  if (!p) return <NotFound />;

  return (
    <div style={{ ['--accent' as string]: p.theme.accent }} className="min-h-screen">
      <div className="fixed inset-0 -z-10" style={{ background: 'hsl(var(--paper))' }} />
      <SiteNav variant="inner" />

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-28">
        <Link to="/" className="inline-flex items-center gap-1.5 text-[12.5px] text-[hsl(var(--graphite)/0.55)] transition-colors hover:text-[hsl(var(--accent))]">
          <ArrowLeft size={13} /> Back to home
        </Link>

        {/* hero */}
        <div className="grid items-center gap-6 py-10 md:grid-cols-[1fr_auto]">
          <div className="reveal">
            <h1 className="serif text-[3.2rem] leading-[1.02] tracking-tight text-[hsl(var(--graphite))] md:text-[4.2rem]">{p.name}</h1>
            <p className="serif-i mt-3 max-w-xl text-[1.4rem] leading-snug text-[hsl(var(--accent))]">{p.question}</p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[hsl(var(--graphite)/0.64)]">{p.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {p.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--graphite)/0.16)] px-3.5 py-1.5 font-mono text-[12px] text-[hsl(var(--graphite)/0.8)] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]">
                  {linkIcon(l.kind)} {l.label}
                </a>
              ))}
              {p.license && <span className="inline-flex items-center rounded-full border border-[hsl(var(--hair))] px-3.5 py-1.5 font-mono text-[12px] text-[hsl(var(--dim))]">{p.license}</span>}
            </div>
          </div>
          <div className="hidden h-44 w-44 md:block lg:h-52 lg:w-52"><Motif id={p.theme.motif} /></div>
        </div>

        {/* stats */}
        <div className="reveal mb-14 grid grid-cols-3 gap-4 rounded-2xl border border-[hsl(var(--hair))] bg-[hsl(var(--graphite)/0.03)] p-6">
          {p.stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="stat-num text-[1.9rem] md:text-[2.3rem]" style={{ color: 'hsl(var(--accent))' }}>{s.value}</div>
              <div className="mt-1 text-[10.5px] uppercase tracking-[0.14em] text-[hsl(var(--dim))]">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-12">
          <Section label="What it is">
            <div className="space-y-4 text-[15.5px] leading-relaxed text-[hsl(var(--graphite)/0.76)]">
              {p.whatItIs.map((t, i) => <p key={i}>{t}</p>)}
            </div>
          </Section>

          <Section label="How it works"><Bullets items={p.howItWorks} /></Section>

          {(p.install || p.demo) && (
            <Section label="Run it">
              {p.install && (
                <div className="mb-4 flex items-center gap-2">
                  <Terminal size={14} style={{ color: 'hsl(var(--accent))' }} />
                  <code className="font-mono text-[13px] text-[hsl(var(--graphite)/0.9)]">{p.install}</code>
                </div>
              )}
              {p.demo && (
                <>
                  {p.demo.note && <p className="mb-3 text-[13.5px] text-[hsl(var(--dim))]">{p.demo.note}</p>}
                  <CodeBlock code={p.demo.code} />
                </>
              )}
            </Section>
          )}

          <Section label="Findings"><Bullets items={p.findings} /></Section>

          <Section label="What it deliberately doesn't cover"><Bullets items={p.doesntCover} muted /></Section>
        </div>

      </main>

      <AskPanel />
    </div>
  );
};

export default ProjectPage;
