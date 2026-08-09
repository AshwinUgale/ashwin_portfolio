import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { askPortfolio } from '@/lib/portfolioChat';
import { SUGGESTED_QUESTIONS } from '@/data/portfolioKnowledge';

type Msg = { role: 'user' | 'assistant'; content: string };

const AskPanel = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const busyRef = useRef(false);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busyRef.current) return;
    setInput('');
    setMessages((m) => {
      const history = m.slice(-6);
      // fire the request with the history captured at click time
      void run(q, history);
      return [...m, { role: 'user', content: q }];
    });
  };

  const run = async (q: string, history: Msg[]) => {
    busyRef.current = true;
    setBusy(true);
    try {
      const res = await askPortfolio(q, history);
      setMessages((m) => [...m, { role: 'assistant', content: res.text }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Something went wrong — email ugaleashwin@gmail.com.' }]);
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };

  useEffect(() => {
    const h = (e: Event) => {
      setOpen(true);
      const q = (e as CustomEvent).detail?.q as string | undefined;
      if (q && q.trim()) setTimeout(() => send(q), 60);
    };
    window.addEventListener('open-portfolio-chat', h as EventListener);
    return () => window.removeEventListener('open-portfolio-chat', h as EventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 120); }, [open]);
  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, busy]);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Ask my portfolio"
        className={`fixed bottom-5 right-5 z-40 rounded-full border px-5 py-2.5 text-[13px] tracking-wide shadow-lg backdrop-blur transition-all hover:scale-105 ${open ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        style={{ borderColor: 'hsl(var(--accent))', color: 'hsl(var(--accent))', background: 'hsl(var(--paper)/0.85)' }}
      >
        Ask my portfolio
      </button>

      <div
        className={`fixed bottom-0 right-0 z-50 flex h-[100dvh] w-full flex-col bg-[hsl(var(--paper-2))] shadow-2xl transition-all duration-300 sm:bottom-5 sm:right-5 sm:h-[560px] sm:w-[400px] sm:rounded-2xl sm:border sm:border-[hsl(var(--hair))] ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
      >
        <div className="flex items-center justify-between border-b border-[hsl(var(--hair))] px-5 py-4">
          <div>
            <div className="serif text-lg text-[hsl(var(--graphite))]">Ask my portfolio</div>
            <div className="text-[11px] text-[hsl(var(--dim))]">answers grounded in Ashwin’s work</div>
          </div>
          <button onClick={() => setOpen(false)} className="text-[hsl(var(--dim))] hover:text-[hsl(var(--graphite))]" aria-label="Close"><X size={18} /></button>
        </div>

        <div ref={bodyRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {messages.length === 0 && !busy && (
            <div className="space-y-1.5">
              <p className="mb-3 text-[13px] leading-relaxed text-[hsl(var(--dim))]">
                Ask about my work, projects, eval methodology, or experience.
              </p>
              {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
                <button key={q} onClick={() => send(q)}
                  className="block w-full border-b border-[hsl(var(--hair))] py-2 text-left text-[13px] text-[hsl(var(--graphite)/0.75)] hover:text-[hsl(var(--accent))]">
                  {q}
                </button>
              ))}
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`soft-in flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                m.role === 'user'
                  ? 'bg-[hsl(var(--accent)/0.14)] text-[hsl(var(--graphite))]'
                  : 'bg-[hsl(var(--graphite)/0.06)] text-[hsl(var(--graphite)/0.86)]'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex gap-1 pl-1">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[hsl(var(--dim))]" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[hsl(var(--dim))]" style={{ animationDelay: '.2s' }} />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[hsl(var(--dim))]" style={{ animationDelay: '.4s' }} />
            </div>
          )}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-[hsl(var(--hair))] px-4 py-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question…"
            className="flex-1 bg-transparent text-[14px] text-[hsl(var(--graphite))] placeholder:text-[hsl(var(--dim))] focus:outline-none"
          />
          <button type="submit" disabled={!input.trim() || busy}
            className="text-[13px] font-medium text-[hsl(var(--accent))] disabled:opacity-30">Send</button>
        </form>
      </div>
    </>
  );
};

export default AskPanel;
