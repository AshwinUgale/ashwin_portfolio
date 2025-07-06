import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Education', href: '#education', id: 'education' },
  { name: 'Skills', href: '#skills', id: 'skills' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/AshwinUgale', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/ashwin-ugale/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:ugaleashwin@gmail.com', label: 'Email' },
];

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState('about');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const sectionIds = navLinks.map(link => link.id);
    const handleScroll = () => {
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse move handler for torch effect
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
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

  // Smooth scroll on click
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setDrawerOpen(false); // close drawer on mobile
  };

  // Resume path (public folder is root for static files)
  const resumePath = '/Ashwin_Ugale_resume.pdf';

  // Get current section name for mobile topbar
  const currentSectionName = navLinks.find(link => link.id === activeSection)?.name || '';

  // Sidebar content as a component for reuse
  const SidebarContent = (
    <div className="flex flex-col gap-y-6 w-full">
      <div className="w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 leading-tight">Ashwin Ugale</h1>
        <h2 className="text-lg sm:text-xl font-semibold text-blue-200 mb-2">Software Engineer</h2>
        <p className="text-slate-400 text-base mb-6">Building scalable software and cloud infrastructure that powers real-world systems.</p>
        <a
          href={resumePath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-auto text-left bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-medium py-2 px-4 rounded-md transition-colors duration-200 shadow-sm mb-4 text-sm border border-blue-500/20"
          style={{ letterSpacing: '0.04em' }}
        >
          View Resume
        </a>
      </div>
      <div className="flex-1 flex flex-col justify-center w-full">
        <nav className="space-y-2 w-full flex flex-col items-start">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={e => handleNavClick(e, link.href, link.id)}
              className={`flex items-center gap-3 py-2 text-base sm:text-lg font-semibold transition-colors pl-0 w-full
                ${activeSection === link.id
                  ? 'text-white font-bold translate-x-2 transition-transform duration-200'
                  : 'text-slate-400 font-medium'}
              `}
              style={{ letterSpacing: '0.05em' }}
            >
              <span className={activeSection === link.id ? 'text-white' : 'text-slate-400'}>
                {link.name.toUpperCase()}
              </span>
            </a>
          ))}
        </nav>
      </div>
      <div className="flex gap-x-6 items-center w-full mt-8">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <social.icon size={22} />
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-transparent text-white relative">
      {/* Minimal, professional background with soft torch effect */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: '#0a1626',
        }}
      >
        {cursor && (
          <div
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: '100vw',
              height: '100vh',
              pointerEvents: 'none',
              zIndex: 1,
              background: `radial-gradient(350px at ${cursor.x}px ${cursor.y}px, rgba(80,180,255,0.10) 0%, rgba(80,180,255,0.04) 50%, transparent 90%)`,
              transition: 'background 0.2s',
            }}
          />
        )}
      </div>
      {/* All content above background */}
      <div className="relative z-10 flex-1 w-full">
        {/* Mobile Topbar: always fixed, above everything, with shadow and blur */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-[60] bg-[#0a1626]/95 shadow-lg backdrop-blur border-b border-white/10 flex items-center justify-between px-6 py-4">
          <span className="text-xl font-extrabold tracking-tight">
            Ashwin Ugale
            <span className="mx-2 text-blue-400 font-semibold">|</span>
            <span className="text-base font-semibold text-slate-200">{currentSectionName}</span>
          </span>
          <button onClick={() => setDrawerOpen(true)} aria-label="Open menu">
            <Menu size={32} />
          </button>
        </div>
        {/* Mobile Drawer: overlays content, not topbar */}
        <div
          className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${drawerOpen ? '' : 'pointer-events-none'}`}
          aria-hidden={!drawerOpen}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setDrawerOpen(false)}
          ></div>
          {/* Drawer */}
          <aside
            className={`absolute top-0 left-0 h-full w-[340px] max-w-[90vw] bg-[#0a1626] shadow-2xl flex flex-col p-8 pt-10 transition-transform duration-300 rounded-r-2xl ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <button className="absolute top-4 right-4" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
              <X size={28} />
            </button>
            {SidebarContent}
          </aside>
        </div>
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col justify-between items-start w-[520px] px-20 py-16 fixed inset-y-0 left-0 z-30 h-screen text-left bg-transparent">
          <div className="flex flex-col justify-between h-full w-full">
            <div>
              <div className="w-full">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">Ashwin Ugale</h1>
                <h2 className="text-lg sm:text-xl font-semibold text-blue-200 mb-2">Software Engineer</h2>
                <p className="text-slate-400 text-base mb-6">Building scalable software and cloud infrastructure that powers real-world systems.</p>
                <a
                  href={resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-auto text-left bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-medium py-2 px-4 rounded-md transition-colors duration-200 shadow-sm mb-4 text-sm border border-blue-500/20"
                  style={{ letterSpacing: '0.04em' }}
                >
                  View Resume
                </a>
              </div>
              <div className="flex-1 flex flex-col justify-center w-full">
                <nav className="space-y-2 w-full flex flex-col items-start">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={e => handleNavClick(e, link.href, link.id)}
                      className={`flex items-center gap-3 py-2 text-base sm:text-lg font-semibold transition-colors pl-0 w-full
                        ${activeSection === link.id
                          ? 'text-white font-bold translate-x-2 transition-transform duration-200'
                          : 'text-slate-400 font-medium'}
                      `}
                      style={{ letterSpacing: '0.05em' }}
                    >
                      <span className={activeSection === link.id ? 'text-white' : 'text-slate-400'}>
                        {link.name.toUpperCase()}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="flex gap-x-6 items-center w-full mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </aside>
        {/* Main Content: pt-16 on mobile, md:pt-0 */}
        <main className="flex-1 min-h-screen px-4 md:px-16 py-8 md:py-20 md:ml-[540px] bg-transparent pt-16 md:pt-0 overflow-y-auto scroll-container">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout; 