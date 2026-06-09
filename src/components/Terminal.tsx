import React, { useEffect, useRef, useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { askPortfolio } from '@/lib/portfolioChat';
import { SUGGESTED_QUESTIONS } from '@/data/portfolioKnowledge';
import { SECTIONS, LINKS, scrollToId } from '@/lib/nav';

type Line = { kind: 'in' | 'out' | 'sys'; text: string };

const HELP = `commands:
  help            show this
  ls              list sections
  go <section>    jump to a section
  whoami          quick intro
  resume          open résumé
  github | email  open link
  clear           reset
or just ask anything in plain english.`;

const Terminal = () => {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    { kind: 'sys', text: 'agent console v2 — ask about my work, or type `help`.' },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      setOpen(true);
      const detail = (e as CustomEvent).detail;
      if (typeof detail === 'string' && detail.trim()) setTimeout(() => run(detail.trim()), 200);
    };
    window.addEventListener('open-portfolio-chat', handler as EventListener);
    return () => window.removeEventListener('open-portfolio-chat', handler as EventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 120); }, [open]);
  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' }); }, [lines, busy]);

  const push = (l: Line) => setLines((p) => [...p, l]);

  const run = async (raw: string) => {
    const cmd = raw.trim();
    if (!cmd || busy) return;
    setInput('');
    push({ kind: 'in', text: cmd });
    const lower = cmd.toLowerCase();

    if (lower === 'clear') { setLines([{ kind: 'sys', text: 'cleared.' }]); return; }
    if (lower === 'help') { push({ kind: 'out', text: HELP }); return; }
    if (lower === 'ls' || lower === 'sections') {
      push({ kind: 'out', text: SECTIONS.map((s) => `${s.no}  ${s.id}`).join('\n') + '\n→ try `go projects`' });
      return;
    }
    if (lower.startsWith('go ') || lower.startsWith('cd ')) {
      const target = lower.slice(3).trim();
      const match = SECTIONS.find((s) => s.id === target || s.label.toLowerCase() === target);
      if (match) { scrollToId(match.id); push({ kind: 'sys', text: `→ ${match.id}` }); }
      else push({ kind: 'out', text: `no section "${target}". try \`ls\`.` });
      return;
    }
    if (lower === 'resume') { window.open(LINKS.resume, '_blank'); push({ kind: 'sys', text: 'opening résumé…' }); return; }
    if (lower === 'github') { window.open(LINKS.github, '_blank'); push({ kind: 'sys', text: 'opening github…' }); return; }
    if (lower === 'linkedin') { window.open(LINKS.linkedin, '_blank'); push({ kind: 'sys', text: 'opening linkedin…' }); return; }
    if (lower === 'email' || lower === 'contact') { window.location.href = LINKS.email; push({ kind: 'sys', text: 'opening mail…' }); return; }

    const q = lower.startsWith('ask ') ? cmd.slice(4) : cmd;
    setBusy(true);
    try {
      const res = await askPortfolio(q);
      push({ kind: 'out', text: res.text });
    } catch {
      push({ kind: 'out', text: 'error — try again, or email ugaleashwin@gmail.com' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open agent console"
        className={`fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 px-4 py-3 font-mono text-[13px] font-semibold shadow-xl transition-all ${open ? 'pointer-events-none opacity-0' : 'opacity-100 hover:scale-105'}`}
        style={{ background: 'hsl(var(--accent))', color: '#0a0b0d', borderRadius: 'var(--radius)' }}
      >
        <Sparkles size={16} /> ask my portfolio
      </button>

      <div
        className={`fixed bottom-0 right-0 z-[80] flex h-[80dvh] w-full flex-col border-white/12 bg-[#0a0b0d]/98 backdrop-blur-xl transition-all duration-300 sm:bottom-5 sm:right-5 sm:h-[540px] sm:w-[440px] sm:border ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
        style={{ borderRadius: 'var(--radius)' }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
            <span className="text-white/70">ashwin@ugale: ~/ask</span>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close" className="text-white/50 hover:text-white"><X size={16} /></button>
        </div>

        <div ref={bodyRef} className="no-scrollbar flex-1 space-y-2 overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed">
          {lines.map((l, i) => (
            <div key={i} className="animate-chat-in whitespace-pre-wrap">
              {l.kind === 'in' && (<div><span className="text-accent" style={{ color: 'hsl(var(--accent))' }}>$</span> <span className="text-white">{l.text}</span></div>)}
              {l.kind === 'out' && <div className="pl-3 text-white/75">{l.text}</div>}
              {l.kind === 'sys' && <div className="text-white/40">{l.text}</div>}
            </div>
          ))}
          {busy && <div className="flex gap-1 pl-3"><span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/50" /><span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/50" style={{ animationDelay: '.2s' }} /><span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/50" style={{ animationDelay: '.4s' }} /></div>}

          {lines.length <= 1 && !busy && (
            <div className="space-y-1.5 pt-2">
              {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
                <button key={q} onClick={() => run(q)} className="block w-full border border-white/10 px-3 py-2 text-left text-[12px] text-white/60 transition-colors hover:border-accent hover:text-accent" style={{ borderRadius: '3px' }}>
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); run(input); }} className="flex items-center gap-2 border-t border-white/10 px-4 py-3 font-mono text-[13px]">
          <span className="text-accent" style={{ color: 'hsl(var(--accent))' }}>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type a command or question…"
            className="flex-1 bg-transparent text-white placeholder:text-white/35 focus:outline-none"
          />
        </form>
      </div>
    </>
  );
};

export default Terminal;
