import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, CornerDownLeft, Hash, Sparkles, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { SECTIONS, LINKS, scrollToId, openTerminal } from '@/lib/nav';

type Item = { id: string; label: string; hint: string; icon: React.ReactNode; run: () => void };

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const toggle = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const ext = () => setOpen(true);
    window.addEventListener('keydown', toggle);
    window.addEventListener('open-command-palette', ext as EventListener);
    return () => {
      window.removeEventListener('keydown', toggle);
      window.removeEventListener('open-command-palette', ext as EventListener);
    };
  }, []);

  useEffect(() => {
    if (open) { setQ(''); setIdx(0); setTimeout(() => inputRef.current?.focus(), 40); }
  }, [open]);

  const baseItems: Item[] = useMemo(() => [
    ...SECTIONS.map((s) => ({
      id: s.id, label: s.label, hint: `goto · ${s.no}`,
      icon: <Hash size={14} />, run: () => scrollToId(s.id),
    })),
    { id: 'ask', label: 'Ask my portfolio', hint: 'open agent terminal', icon: <Sparkles size={14} />, run: openTerminal },
    { id: 'resume', label: 'Open résumé', hint: 'pdf', icon: <FileText size={14} />, run: () => window.open(LINKS.resume, '_blank') },
    { id: 'github', label: 'GitHub', hint: 'external', icon: <Github size={14} />, run: () => window.open(LINKS.github, '_blank') },
    { id: 'linkedin', label: 'LinkedIn', hint: 'external', icon: <Linkedin size={14} />, run: () => window.open(LINKS.linkedin, '_blank') },
    { id: 'email', label: 'Email', hint: 'ugaleashwin@gmail.com', icon: <Mail size={14} />, run: () => (window.location.href = LINKS.email) },
  ], []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return baseItems;
    const hits = baseItems.filter((i) => i.label.toLowerCase().includes(term) || i.hint.toLowerCase().includes(term));
    const askItem: Item = {
      id: 'ask-dyn', label: `Ask: "${q.trim()}"`, hint: 'run on agent', icon: <Sparkles size={14} />,
      run: () => window.dispatchEvent(new CustomEvent('open-portfolio-chat', { detail: q.trim() })),
    };
    return [askItem, ...hits];
  }, [q, baseItems]);

  useEffect(() => { setIdx(0); }, [q]);

  const choose = (i: Item) => { setOpen(false); setTimeout(i.run, 60); };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); filtered[idx] && choose(filtered[idx]); }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh]" onClick={() => setOpen(false)}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="animate-chat-in relative w-full max-w-xl overflow-hidden border border-white/12 bg-[#0e0f12] shadow-2xl"
        style={{ borderRadius: 'var(--radius)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span className="font-mono text-sm text-accent" style={{ color: 'hsl(var(--accent))' }}>{'>'}</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="type a command, section, or question…"
            className="flex-1 bg-transparent font-mono text-sm text-white placeholder:text-white/35 focus:outline-none"
          />
          <kbd className="font-mono text-[10px] text-white/40">esc</kbd>
        </div>
        <div className="max-h-[46vh] overflow-y-auto py-1.5">
          {filtered.map((it, i) => (
            <button
              key={it.id}
              onMouseEnter={() => setIdx(i)}
              onClick={() => choose(it)}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${i === idx ? 'bg-white/[0.06]' : ''}`}
            >
              <span className={i === idx ? 'text-accent' : 'text-white/45'} style={i === idx ? { color: 'hsl(var(--accent))' } : undefined}>{it.icon}</span>
              <span className="flex-1 text-sm text-white">{it.label}</span>
              <span className="font-mono text-[10px] text-white/35">{it.hint}</span>
              {i === idx && <CornerDownLeft size={13} className="text-white/40" />}
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-center font-mono text-xs text-white/40">no matches</div>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 font-mono text-[10px] text-white/35">
          <span className="flex items-center gap-1"><ArrowRight size={11} /> navigate ↑↓ · select ⏎</span>
          <span>agent console</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
