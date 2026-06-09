import React from 'react';
import Band from './Band';
import Reveal from './Reveal';

const groups = [
  { k: 'ai / llm', items: ['OpenAI', 'Tool-Calling', 'ReAct', 'RAG', 'Hybrid Retrieval', 'Embeddings', 'MCP', 'LangGraph', 'Evals', 'Prompt Eng'] },
  { k: 'backend', items: ['FastAPI', 'Node.js', 'Express', 'REST', 'WebSockets', 'OAuth2 + PoP', 'APScheduler'] },
  { k: 'data', items: ['Qdrant', 'pgvector', 'SQL Server', 'PostgreSQL', 'Redis', 'MongoDB', 'BM25'] },
  { k: 'frontend', items: ['React', 'TypeScript', 'Redux', 'Vite', 'Tailwind'] },
  { k: 'cloud / ci', items: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'OIDC'] },
  { k: 'security', items: ['CodeQL', 'Semgrep', 'Dependabot', 'TruffleHog', 'pytest', 'vitest'] },
];

const langs = ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Java', 'Go'];

const Skills = () => (
  <Band id="skills" no="05" kicker="stack" title="Tools I reach for.">
    <div className="grid gap-px overflow-hidden border border-white/10 sm:grid-cols-2 lg:grid-cols-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
      {groups.map((g, i) => (
        <Reveal key={g.k} delay={i * 60}>
          <div className="h-full bg-[#0b0c0e] p-5">
            <div className="mono-label mb-3" style={{ color: 'hsl(var(--accent))' }}>{g.k}</div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((it) => <span key={it} className="tag">{it}</span>)}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
    <Reveal>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="mono-label">languages</span>
        {langs.map((l) => <span key={l} className="tag-accent">{l}</span>)}
      </div>
    </Reveal>
  </Band>
);

export default Skills;
