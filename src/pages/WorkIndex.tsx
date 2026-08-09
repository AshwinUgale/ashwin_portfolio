import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, GROUPS, type Project } from '@/data/projects';
import Motif from '@/components/work/Motif';
import SiteNav from '@/components/SiteNav';
import AskPanel from '@/components/AskPanel';
import { useReveal } from '@/hooks/useReveal';

const Card = ({ p }: { p: Project }) => (
  <Link to={`/work/${p.slug}`} style={{ ['--accent' as string]: p.theme.accent }}
    className="panel reveal group flex flex-col p-6">
    <div className="flex items-start justify-between">
      <span className="h-12 w-12 shrink-0"><Motif id={p.theme.motif} /></span>
      <ArrowUpRight size={17} className="text-[hsl(var(--graphite)/0.25)] transition-colors group-hover:text-[hsl(var(--accent))]" />
    </div>
    <div className="mt-5 flex items-baseline justify-between gap-2">
      <span className="serif text-[24px] leading-none text-[hsl(var(--graphite))]">{p.name}</span>
      <span className="text-[10px] uppercase tracking-wider text-[hsl(var(--dim))]">{p.channel}</span>
    </div>
    <p className="serif-i mt-2 text-[16px] leading-snug text-[hsl(var(--accent))]">{p.question}</p>
    <p className="mt-2.5 text-[13.5px] leading-relaxed text-[hsl(var(--graphite)/0.62)]">{p.tagline}</p>
    <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
      {p.tags.slice(0, 4).map((t) => <span key={t} className="pill">{t}</span>)}
    </div>
  </Link>
);

const WorkIndex = () => {
  useReveal();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Work — Ashwin Ugale';
  }, []);

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10" style={{ background: 'hsl(var(--paper))' }} />
      <SiteNav variant="inner" />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        <div className="reveal mb-14">
          <div className="kicker">Selected work</div>
          <h1 className="serif mt-2 text-[3rem] leading-[1.02] tracking-tight text-[hsl(var(--graphite))] md:text-[4.2rem]">Things I’ve built.</h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-[hsl(var(--graphite)/0.66)]">
            Production AI engineering, shipped to PyPI, the VS Code Marketplace, and the MCP ecosystem.
            Each project answers one sharp question — and each card opens a full case study with a demo,
            findings, and what it deliberately doesn’t cover.
          </p>
        </div>

        {GROUPS.map((g) => (
          <section key={g.id} className="mb-16">
            <div className="reveal mb-1 flex items-baseline gap-3">
              <h2 className="serif text-[1.8rem] text-[hsl(var(--graphite))]">{g.label}</h2>
              <span className="text-[12px] text-[hsl(var(--dim))]">{PROJECTS.filter((p) => p.group === g.id).length} projects</span>
            </div>
            <p className="reveal mb-6 max-w-2xl text-[13.5px] leading-relaxed text-[hsl(var(--dim))]">{g.blurb}</p>
            <div className="grid gap-5 md:grid-cols-2">
              {PROJECTS.filter((p) => p.group === g.id).map((p) => <Card key={p.slug} p={p} />)}
            </div>
          </section>
        ))}
      </main>
      <AskPanel />
    </div>
  );
};

export default WorkIndex;
