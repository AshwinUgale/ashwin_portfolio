import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, X, ArrowUp } from 'lucide-react';
import { askPortfolio } from '@/lib/portfolioChat';
import { SUGGESTED_QUESTIONS, PROFILE } from '@/data/portfolioKnowledge';

type Msg = { role: 'user' | 'assistant'; content: string; sources?: string[] };

const GREETING: Msg = {
  role: 'assistant',
  content:
    `Hi — I'm ${PROFILE.name}'s portfolio assistant. Ask me anything about his AI work, projects, eval methodology, or experience. Pick a question below or type your own.`,
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-portfolio-chat', handler as EventListener);
    return () => window.removeEventListener('open-portfolio-chat', handler as EventListener);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    setInput('');
    const history = messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .slice(-6)
      .map((m) => ({ role: m.role, content: m.content }));
    setMessages((m) => [...m, { role: 'user', content: q }]);
    setLoading(true);
    try {
      const res = await askPortfolio(q, history);
      setMessages((m) => [...m, { role: 'assistant', content: res.text, sources: res.sources }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: 'Something went wrong answering that. Try rephrasing, or email ' + PROFILE.email + '.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Ask my portfolio"
        className={`fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-gradient-to-r from-teal-400/90 to-indigo-400/90 px-4 py-3 text-sm font-semibold text-[#070b14] shadow-lg shadow-teal-500/20 transition-all hover:scale-105 ${
          open ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <Sparkles size={18} />
        <span className="hidden sm:inline">Ask my portfolio</span>
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-0 right-0 z-[80] flex h-[100dvh] w-full flex-col sm:bottom-5 sm:right-5 sm:h-[600px] sm:max-h-[80vh] sm:w-[400px] sm:rounded-2xl
          border-white/10 bg-[#0a1020]/98 backdrop-blur-xl transition-all duration-300 sm:border
          ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400/20 to-indigo-400/20 text-teal-200">
              <Sparkles size={16} />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">Ask my portfolio</div>
              <div className="font-mono text-[10px] text-slate-500">grounded in Ashwin's work</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`animate-chat-in max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-teal-400/15 text-teal-50 rounded-br-sm'
                    : 'bg-white/[0.05] text-slate-200 rounded-bl-sm'
                }`}
              >
                {m.content}
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1 border-t border-white/10 pt-2">
                    {m.sources.map((s) => (
                      <span key={s} className="font-mono text-[9px] uppercase tracking-wide text-slate-500">
                        ↳ {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white/[0.05] px-4 py-3">
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-slate-400" style={{ animationDelay: '0.2s' }} />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-slate-400" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}

          {messages.length <= 1 && !loading && (
            <div className="space-y-1.5 pt-1">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="block w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-[12px] text-slate-300 transition-colors hover:border-teal-300/30 hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-3">
          <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 focus-within:border-teal-300/40">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder="Ask about my work…"
              className="max-h-24 flex-1 resize-none bg-transparent text-[13px] text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              aria-label="Send"
              className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-indigo-400 text-[#070b14] transition-opacity disabled:opacity-30"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
