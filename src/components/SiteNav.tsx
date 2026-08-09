import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RESUME = '/Ashwin_Ugale_resume.pdf';

const SiteNav = ({ variant = 'home' }: { variant?: 'home' | 'inner' }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    if (variant !== 'home') return;
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const links: [string, string][] = [['Work', 'work'], ['Contact', 'contact']];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'border-b border-[hsl(var(--hair))] bg-[hsl(var(--paper)/0.7)] backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="serif text-[19px] tracking-tight text-[hsl(var(--graphite))]">Ashwin Ugale</Link>
        <div className="flex items-center gap-6 text-[13px] text-[hsl(var(--graphite)/0.68)]">
          {links.map(([label, id]) =>
            variant === 'home' ? (
              <a key={id} href={`#${id}`} onClick={go(id)} className="hidden transition-colors hover:text-[hsl(var(--accent))] sm:inline">{label}</a>
            ) : (
              <Link key={id} to={`/#${id}`} className="hidden transition-colors hover:text-[hsl(var(--accent))] sm:inline">{label}</Link>
            )
          )}
          <a href={RESUME} target="_blank" rel="noopener noreferrer" className="hidden transition-colors hover:text-[hsl(var(--accent))] sm:inline">Résumé</a>
          <a href="https://github.com/AshwinUgale" target="_blank" rel="noopener noreferrer"
            className="rounded-full border border-[hsl(var(--graphite)/0.16)] px-3.5 py-1.5 text-[12.5px] text-[hsl(var(--graphite)/0.85)] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]">
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
};

export default SiteNav;
