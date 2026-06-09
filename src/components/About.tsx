import React from 'react';
import Band from './Band';
import Reveal from './Reveal';

const spec: [string, string][] = [
  ['role', 'ai / llm engineer'],
  ['current', 'enidus usa · since aug 2025'],
  ['location', 'remote · ny (us)'],
  ['domain', 't-mobile for business · telecom'],
  ['education', 'm.s. cs — indiana university'],
  ['focus', 'agents · rag · secure backends'],
];

const About = () => (
  <Band id="about" no="01" kicker="about" title="The engineer.">
    <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
      <Reveal className="space-y-4 text-[15px] leading-relaxed text-white/70">
        <p>
          I build <span className="text-white">production LLM agent systems</span> and the backends
          that hold them up. At Enidus I'm building a multi-tenant tool-calling platform for
          T-Mobile for Business — FastAPI, OpenAI, Qdrant and SQL Server on Azure — with 50+ tools,
          server-side JWT tenant isolation, and human-in-the-loop gates before any carrier-side change.
        </p>
        <p>
          I treat AI like any other production software: every release is gated by a labeled eval,
          regressions get <span className="text-white">measured and reverted</span> rather than hidden,
          and retrieval is hybrid. Underneath sits real full-stack depth — Node/TypeScript services, an
          OAuth 2.0 + Proof-of-Possession layer, SQL-persisted state machines, and React frontends.
        </p>
        <p className="text-white/50">
          On the side I ship open-source: four production AI projects across PyPI, the VS Code
          Marketplace, and the MCP ecosystem — each with public eval harnesses so anyone can audit how I work.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="surface p-5 font-mono text-[12.5px]">
          <div className="mb-3 flex items-center gap-2 text-white/40">
            <span className="text-accent" style={{ color: 'hsl(var(--accent))' }}>$</span> cat profile.cfg
          </div>
          <div className="space-y-2">
            {spec.map(([k, v]) => (
              <div key={k} className="flex gap-3">
                <span className="w-20 shrink-0 text-white/40">{k}</span>
                <span className="text-white/85">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </Band>
);

export default About;
