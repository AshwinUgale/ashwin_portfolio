import React, { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    const h = () => setOpen(true);
    window.addEventListener('open-portfolio-chat', h as EventListener);
    return () => window.removeEventListener('open-portfolio-chat', h as EventListener);
  }, []);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 120); }, [open]);
  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, busy]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    setInput('');
    const history = messages.slice(-6);
    setMessages((m) => [...m, { role: 'user', content: q }]);
    setBusy(true);
    try {
      const res = await askPortfolio(q, history);
      setMessages((m) => [...m, { role: 'assistant', content: res.text }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Something went wrong — email ugaleashwin@gmail.com.' }]);
    } finally { setBusy(false); }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Ask my portfolio"
        className={`fixed bottom-5 right-5 z-40 rounded-full border px-5 py-2.5 text-[13px] tracking-wide shadow-lg transition-all hover:scale-105 ${open ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        style={{ borderColor: 'hsl(var(--accent))', color: 'hsl(var(--accent))', background: 'hsl(var(--ink)/0.85)', backdropFilter: 'blur(6px)' }}
      >
        Ask my portfolio
      </button>

      <div
        className={`fixed bottom-0 right-0 z-50 flex h-[100dvh] w-full flex-col border-[rgba(236,232,225,0.12)] bg-[hsl(var(--panel))] transition-all duration-300 sm:bottom-5 sm:right-5 sm:h-[560px] sm:w-[400px] sm:rounded-xl sm:border ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
      >
        <div className="flex items-center justify-between border-b border-[rgba(236,232,225,0.1)] px-5 py-4">
          <div>
            <div className="serif text-lg text-[hsl(var(--cream))]">Ask my portfolio</div>
            <div className="text-[11px] text-[hsl(var(--cream)/0.4)]">answers grounded in Ashwin’s work</div>
          </div>
          <button onClick={() => setOpen(false)} className="text-[hsl(var(--cream)/0.5)] hover:text-[hsl(var(--cream))]" aria-label="Close">✕</button>
        </div>

        <div ref={bodyRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {messages.length === 0 && !busy && (
            <div className="space-y-1.5">
              <p className="mb-3 text-[13px] leading-relaxed text-[hsl(var(--cream)/0.6)]">
                Ask about my work, projects, eval methodology, or experience.
              </p>
              {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
                <button key={q} onClick={() => send(q)}
                  className="block w-full border-b border-[rgba(236,232,225,0.1)] py-2 text-left text-[13px] text-[hsl(var(--cream)/0.7)] hover:text-[hsl(var(--accent))]">
                  {q}
                </button>
              ))}
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`soft-in flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[88%] whitespace-pre-wrap rounded-lg px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                m.role === 'user'
                  ? 'bg-[rgba(230,179,90,0.12)] text-[hsl(var(--cream))]'
                  : 'bg-[rgba(236,232,225,0.05)] text-[hsl(var(--cream)/0.82)]'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex gap-1 pl-1">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[hsl(var(--cream)/0.5)]" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[hsl(var(--cream)/0.5)]" style={{ animationDelay: '.2s' }} />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[hsl(var(--cream)/0.5)]" style={{ animationDelay: '.4s' }} />
            </div>
          )}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-[rgba(236,232,225,0.1)] px-4 py-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question…"
            className="flex-1 bg-transparent text-[14px] text-[hsl(var(--cream))] placeholder:text-[hsl(var(--cream)/0.35)] focus:outline-none"
          />
          <button type="submit" disabled={!input.trim() || busy}
            className="text-[13px] text-[hsl(var(--accent))] disabled:opacity-30">Send</button>
        </form>
      </div>
    </>
  );
};

export default AskPanel;
