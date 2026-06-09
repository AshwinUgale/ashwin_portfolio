import React, { useEffect, useState } from 'react';
import { Command, Github, Linkedin, Mail, FileText, Terminal as TerminalIcon } from 'lucide-react';
import { SECTIONS, LINKS, scrollToId, openPalette, openTerminal } from '@/lib/nav';

const CommandBar = () => {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>('about');
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      let cur: string = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) cur = s.id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#0a0b0d]/80 px-4 py-2.5 backdrop-blur-md md:px-6">
        <button onClick={() => scrollToId('top')} className="group flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-accent text-[#0a0b0d]" style={{ background: 'hsl(var(--accent))' }}>
            <TerminalIcon size={14} />
          </span>
          <span className="font-mono text-sm font-semibold text-white">ashwin<span className="text-accent">@</span>ugale</span>
          <span className="caret hidden sm:inline">_</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToId(s.id)}
              className={`font-mono text-xs px-2.5 py-1 transition-colors ${
                active === s.id ? 'text-accent' : 'text-white/45 hover:text-white'
              }`}
            >
              {s.label.toLowerCase()}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hidden p-1.5 text-white/50 transition-colors hover:text-accent sm:block"><Github size={16} /></a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hidden p-1.5 text-white/50 transition-colors hover:text-accent sm:block"><Linkedin size={16} /></a>
          <a href={LINKS.email} aria-label="Email" className="hidden p-1.5 text-white/50 transition-colors hover:text-accent sm:block"><Mail size={16} /></a>
          <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className="hidden p-1.5 text-white/50 transition-colors hover:text-accent sm:block" aria-label="Resume"><FileText size={16} /></a>
          <button onClick={openPalette} className="ml-1 flex items-center gap-1.5 rounded-[4px] border border-white/15 px-2 py-1 font-mono text-[11px] text-white/60 transition-colors hover:border-accent hover:text-accent">
            <Command size={12} /> {isMac ? '⌘' : 'Ctrl'}K
          </button>
        </div>
      </div>
      <div className="h-px w-full bg-white/5">
        <div className="h-px bg-accent transition-[width] duration-150" style={{ width: `${progress}%`, background: 'hsl(var(--accent))' }} />
      </div>
    </header>
  );
};

export default CommandBar;
