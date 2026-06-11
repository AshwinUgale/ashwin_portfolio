import React from 'react';
import { Github, ExternalLink, Package } from 'lucide-react';
import Band from './Band';
import Reveal from './Reveal';

type Lnk = { label: string; href: string; kind: 'code' | 'ext' | 'pkg' };
type P = { no: string; title: string; channel: string; tagline: string; metrics: string[]; tags: string[]; links: Lnk[] };

const projects: P[] = [
  {
    no: '01', title: 'DocChat', channel: 'VS Code Marketplace',
    tagline: 'Version-pinned library-docs Q&A in VS Code — answers from the exact version your lockfile pins, and refuses instead of hallucinating.',
    metrics: ['0.943 version-correct', '1.000 OOS refusal', '48-pair eval'],
    tags: ['TypeScript', 'FastAPI', 'Qdrant', 'ReAct'],
    links: [
      { kind: 'ext', label: 'marketplace', href: 'https://marketplace.visualstudio.com/items?itemName=AshwinUgale.docchat' },
      { kind: 'code', label: 'code', href: 'https://github.com/AshwinUgale/docchat' },
    ],
  },
  {
    no: '02', title: 'Mneme', channel: 'PyPI · smolAmem',
    tagline: 'Multi-tier long-term memory for LLM agents — working / episodic / semantic — with pluggable backends and decay-based forgetting.',
    metrics: ['recall@5 = 1.000', '<50% token cost'],
    tags: ['Python', 'Qdrant', 'pgvector', 'APScheduler'],
    links: [
      { kind: 'pkg', label: 'pypi', href: 'https://pypi.org/project/smolAmem/' },
      { kind: 'ext', label: 'docs', href: 'https://ashwinugale.github.io/mneme/' },
      { kind: 'code', label: 'code', href: 'https://github.com/AshwinUgale/mneme' },
    ],
  },
  {
    no: '03', title: 'ToolPicker', channel: 'PyPI · toolpicker',
    tagline: 'Hybrid BM25 + semantic tool router with intent-classifier reranking and Reciprocal Rank Fusion, plus a token-budget packer.',
    metrics: ['BM25 + semantic + intent', 'ToolBench / Gorilla evals'],
    tags: ['Python', 'rank-bm25', 'scikit-learn'],
    links: [
      { kind: 'pkg', label: 'pypi', href: 'https://pypi.org/project/toolpicker/' },
      { kind: 'ext', label: 'docs', href: 'https://ashwinugale.github.io/toolpicker/' },
      { kind: 'code', label: 'code', href: 'https://github.com/AshwinUgale/toolpicker' },
    ],
  },
  {
    no: '04', title: 'docchat-server', channel: 'PyPI · MCP server',
    tagline: 'DocChat’s retrieval engine as a Model Context Protocol server — version-pinned grounding for Claude Code, Cursor, Cline, and any MCP client.',
    metrics: ['FastMCP + embedded Qdrant', 'MCP: search_docs / list_indexed'],
    tags: ['Python', 'MCP', 'FastMCP', 'Qdrant'],
    links: [
      { kind: 'pkg', label: 'pypi', href: 'https://pypi.org/project/docchat-server/' },
      { kind: 'code', label: 'code', href: 'https://github.com/AshwinUgale/docchat-mcp' },
    ],
  },
];

const linkIcon = (k: string) => (k === 'code' ? <Github size={12} /> : k === 'pkg' ? <Package size={12} /> : <ExternalLink size={12} />);

const Projects = () => (
  <Band id="projects" no="03" kicker="featured · open source" title="What I ship.">
    <Reveal>
      <p className="-mt-4 mb-7 max-w-2xl text-sm leading-relaxed text-white/55">
        Four production AI projects across PyPI, the VS Code Marketplace, and the MCP ecosystem. Every
        release gated by a labeled eval — public CHANGELOGs even document two reverted regressions.
      </p>
    </Reveal>

    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((p, i) => (
        <Reveal key={p.title} delay={i * 80}>
          <article className="surface flex h-full flex-col p-5">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-xs text-white/30">{p.no}</span>
              <span className="font-mono text-[10px] uppercase tracking-wide" style={{ color: 'hsl(var(--accent))' }}>{p.channel}</span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold text-white">{p.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/60">{p.tagline}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.metrics.map((m) => <span key={m} className="tag-accent">{m}</span>)}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>

            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              {p.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-white/12 px-2.5 py-1 font-mono text-[11px] text-white/70 transition-colors hover:border-accent hover:text-accent" style={{ borderRadius: '3px' }}>
                  {linkIcon(l.kind)} {l.label}
                </a>
              ))}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </Band>
);

export default Projects;
