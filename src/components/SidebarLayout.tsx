import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Menu, X, FileText, Sparkles } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Other Work', href: '#other-projects', id: 'other-projects' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Education', href: '#education', id: 'education' },
  { name: 'Certifications', href: '#certifications', id: 'certifications' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/AshwinUgale', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/ashwin-ugale/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:ugaleashwin@gmail.com', label: 'Email' },
];

const RESUME_URL = '/Ashwin_Ugale_resume.pdf';

const openChat = () => window.dispatchEvent(new CustomEvent('open-portfolio-chat'));

const Identity = ({ compact = false }: { compact?: boolean }) => (
  <div className="w-full">
    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-300/[0.06] px-3 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse-dot" />
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-teal-200">
        Open to opportunities
      </span>
    </div>
    <h1 className={`font-extrabold tracking-tight leading-tight ${compact ? 'text-2xl' : 'text-3xl sm:text-[2.6rem]'}`}>
      Ashwin Ugale
    </h1>
    <h2 className={`font-semibold gradient-text ${compact ? 'text-base mt-1' : 'text-lg sm:text-xl mt-1.5'}`}>
      AI / LLM Engineer
    </h2>
    <p className={`text-slate-400 leading-relaxed ${compact ? 'text-sm mt-2' : 'text-[15px] mt-3 max-w-xs'}`}>
      I build production LLM agent platforms, eval-driven RAG, and the full-stack
      backends behind them.
    </p>
    <div className={`flex flex-wrap gap-2 ${compact ? 'mt-3' : 'mt-5'}`}>
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-teal-300/30 hover:text-white"
      >
        <FileText size={15} /> Resume
      </a>
      <button
        onClick={openChat}
        className="inline-flex items-center gap-2 rounded-lg border border-teal-300/30 bg-gradient-to-r from-teal-400/15 to-indigo-400/15 px-3.5 py-2 text-sm font-semibold text-teal-100 transition-all hover:from-teal-400/25 hover:to-indigo-400/25"
      >
        <Sparkles size={15} /> Ask my portfolio
      </button>
    </div>
  </div>
);

const NavList = ({
  activeSection,
  onNavClick,
  mobile = false,
}: {
  activeSection: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => void;
  mobile?: boolean;
}) => (
  <nav className="flex w-full flex-col items-start gap-0.5">
    {navLinks.map((link) => {
      const active = activeSection === link.id;
      return (
        <a
          key={link.name}
          href={link.href}
          onClick={(e) => onNavClick(e, link.href, link.id)}
          className={`group flex w-full items-center gap-3 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-all
            ${active ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <span
            className={`h-px transition-all duration-300 ${
              active ? 'w-8 bg-teal-300' : 'w-4 bg-slate-600 group-hover:w-6 group-hover:bg-slate-400'
            }`}
          />
          {link.name}
        </a>
      );
    })}
  </nav>
);

const Socials = () => (
  <div className="flex w-full items-center gap-1">
    {socialLinks.map((social) => (
      <a
        key={social.label}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.label}
        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-teal-300"
      >
        <social.icon size={20} />
      </a>
    ))}
  </div>
);

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState('about');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.id);
    const handleScroll = () => {
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 320) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    const handleLeave = () => setCursor(null);
    if (window.innerWidth >= 768) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseleave', handleLeave);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, _href: string, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setDrawerOpen(false);
  };

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', drawerOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [drawerOpen]);

  const currentSectionName = navLinks.find((l) => l.id === activeSection)?.name || '';

  return (
    <div className="relative flex min-h-screen text-white">
      {/* Background: deep navy gradient + grid + cursor glow */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_0%,#0e1730_0%,#070b14_55%)]" />
        <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:46px_46px]" />
        <div className="absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]" />
        {cursor && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: `radial-gradient(420px at ${cursor.x}px ${cursor.y}px, rgba(94,234,212,0.07) 0%, rgba(129,140,248,0.05) 45%, transparent 80%)`,
              transition: 'background 0.2s',
            }}
          />
        )}
      </div>

      <div className="relative z-10 w-full flex-1">
        {/* Mobile topbar */}
        <div className="fixed left-0 right-0 top-0 z-[60] flex items-center justify-between border-b border-white/10 bg-[#070b14]/95 px-5 py-4 backdrop-blur md:hidden">
          <span className="text-lg font-extrabold tracking-tight">
            Ashwin Ugale
            <span className="mx-2 font-mono text-xs font-medium text-teal-300">/ {currentSectionName}</span>
          </span>
          <button onClick={() => setDrawerOpen((o) => !o)} aria-label="Toggle menu">
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${drawerOpen ? '' : 'pointer-events-none'}`}
          aria-hidden={!drawerOpen}
        >
          <div
            className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setDrawerOpen(false)}
          />
          <aside
            className={`absolute left-0 top-0 flex h-full w-[340px] max-w-[90vw] flex-col gap-6 rounded-r-2xl border-r border-white/10 bg-[#0a1020] p-6 pt-20 shadow-2xl transition-transform duration-300 ${
              drawerOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <button className="absolute right-4 top-4" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
              <X size={26} />
            </button>
            <Identity compact />
            <NavList activeSection={activeSection} onNavClick={handleNavClick} mobile />
            <hr className="border-white/10" />
            <Socials />
          </aside>
        </div>

        {/* Desktop sidebar */}
        <aside className="fixed inset-y-0 left-0 z-30 hidden h-screen w-[460px] flex-col justify-between px-16 py-16 md:flex">
          <Identity />
          <div className="flex flex-col gap-10">
            <NavList activeSection={activeSection} onNavClick={handleNavClick} />
          </div>
          <Socials />
        </aside>

        {/* Main content */}
        <main className="scroll-container min-h-screen flex-1 overflow-y-auto px-4 pt-20 md:ml-[480px] md:px-16 md:pt-20">
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<{ activeSection?: string }>, { activeSection })
              : child
          )}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
