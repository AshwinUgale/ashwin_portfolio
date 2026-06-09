import React, { useEffect, useState } from 'react';
import { ArrowDown, Command } from 'lucide-react';
import { scrollToId, openTerminal, openPalette } from '@/lib/nav';
import { SUGGESTED_QUESTIONS } from '@/data/portfolioKnowledge';

function useRotatingTyper(items: string[]) {
  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = items[i % items.length];
    let t: ReturnType<typeof setTimeout>;
    if (!del && text === full) {
      t = setTimeout(() => setDel(true), 1700);
    } else if (del && text === '') {
      setDel(false);
      setI((x) => x + 1);
    } else {
      t = setTimeout(() => {
        setText((prev) => (del ? prev.slice(0, -1) : full.slice(0, prev.length + 1)));
      }, del ? 26 : 50);
    }
    return () => clearTimeout(t);
  }, [text, del, i, items]);

  return text;
}

const BOOT = [
  { cmd: 'whoami', out: 'ashwin ugale' },
  { cmd: 'cat focus.txt', out: 'production LLM agent platforms · eval-driven RAG · full-stack backends' },
  { cmd: 'status --now', out: '● open to opportunities · building @ Enidus (T-Mobile for Business)' },
];

const HeroConsole = () => {
  const typed = useRotatingTyper(SUGGESTED_QUESTIONS);

  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center px-5 pt-24 pb-16 md:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mono-label mb-5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
          portfolio · v2 · agent console
        </div>

        <h1 className="font-display font-bold leading-[0.92] tracking-tight text-white text-[clamp(2.6rem,8vw,5rem)]">
          Ashwin Ugale<span style={{ color: 'hsl(var(--accent))' }}>.</span>
        </h1>

        <p className="mt-5 max-w-xl font-display text-lg text-white/70 md:text-xl">
          I build production LLM agents, eval-driven RAG, and the
          <span className="text-white"> full-stack backends</span> that run them.
        </p>

        <div className="surface mt-9 max-w-2xl overflow-hidden p-0" style={{ background: 'hsl(var(--bg-2) / 0.85)' }}>
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="ml-2 font-mono text-[11px] text-white/40">ashwin@ugale: ~/portfolio</span>
          </div>
          <div className="space-y-2 p-4 font-mono text-[12.5px] leading-relaxed md:text-sm">
            {BOOT.map((b) => (
              <div key={b.cmd}>
                <div className="text-white/55">
                  <span style={{ color: 'hsl(var(--accent))' }}>$</span> {b.cmd}
                </div>
                <div className="text-white/85">{b.out}</div>
              </div>
            ))}
            <div className="pt-1 text-white/85">
              <span style={{ color: 'hsl(var(--accent))' }}>$</span> ask portfolio "
              <span className="text-white">{typed}</span>
              <span className="caret">_</span>"
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button onClick={() => openTerminal()} className="btn-term-solid">▶ ask my portfolio</button>
          <button onClick={() => scrollToId('projects')} className="btn-term">./view-work</button>
          <button onClick={openPalette} className="hidden items-center gap-2 font-mono text-xs text-white/40 transition-colors hover:text-accent sm:flex">
            <Command size={13} /> press ⌘K for commands
          </button>
        </div>
      </div>

      <button onClick={() => scrollToId('about')} aria-label="Scroll down" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 transition-colors hover:text-accent">
        <ArrowDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
};

export default HeroConsole;
