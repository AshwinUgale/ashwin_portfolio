import React, { useEffect, useState } from 'react';
import { AboutNode, ExperienceNode, ProjectsNode, OtherNode, SkillsNode, EducationNode, ContactNode } from './nodes';

const LINKS = {
  resume: '/Ashwin_Ugale_resume.pdf',
  email: 'mailto:ugaleashwin@gmail.com',
  github: 'https://github.com/AshwinUgale',
  linkedin: 'https://linkedin.com/in/ashwin-ugale/',
};

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'other', label: 'Also built' },
  { id: 'skills', label: 'Tools' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const ask = () => window.dispatchEvent(new CustomEvent('open-portfolio-chat'));
const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const ReadableLayout = () => {
  const [active, setActive] = useState('about');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 lg:flex lg:gap-14">
      <aside className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[40%] lg:max-w-sm lg:flex-col lg:justify-between lg:py-20">
        <div className="pt-16 lg:pt-0">
          <h1 className="serif text-[3.2rem] leading-[1.02] tracking-tight text-[hsl(var(--cream))] md:text-[3.8rem]">
            Ashwin Ugale
          </h1>
          <p className="mt-2 text-[15px] text-[hsl(var(--cream)/0.8)]">AI / LLM Engineer</p>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-[hsl(var(--cream)/0.55)]">
            I build production agent systems and the backends behind them — currently at Enidus, on an
            LLM platform for T-Mobile for Business.
          </p>

          <nav className="mt-10 hidden flex-col gap-3 lg:flex">
            {SECTIONS.map((s) => (
              <button key={s.id} onClick={() => goTo(s.id)} className="group flex items-center gap-3 text-left">
                <span className={`h-px transition-all duration-300 ${active === s.id ? 'w-12 bg-[hsl(var(--accent))]' : 'w-6 bg-[hsl(var(--cream)/0.25)] group-hover:w-10'}`} />
                <span className={`text-[12px] uppercase tracking-[0.22em] transition-colors ${active === s.id ? 'text-[hsl(var(--cream))]' : 'text-[hsl(var(--cream)/0.42)] group-hover:text-[hsl(var(--cream))]'}`}>
                  {s.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] lg:mt-0">
          <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className="ed-link">Résumé</a>
          <a href={LINKS.email} className="ed-link">Email</a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="ed-link">GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="ed-link">LinkedIn</a>
          <button onClick={ask} className="ed-link accent">Ask my portfolio →</button>
        </div>
      </aside>

      <main className="py-16 lg:w-[60%] lg:py-20">
        <div className="space-y-24">
          <section id="about" className="scroll-mt-16"><AboutNode /></section>
          <section id="experience" className="scroll-mt-16"><ExperienceNode /></section>
          <section id="projects" className="scroll-mt-16"><ProjectsNode /></section>
          <section id="other" className="scroll-mt-16"><OtherNode /></section>
          <section id="skills" className="scroll-mt-16"><SkillsNode /></section>
          <section id="education" className="scroll-mt-16"><EducationNode /></section>
          <section id="contact" className="scroll-mt-16"><ContactNode onAsk={ask} /></section>
        </div>
        <p className="mt-20 text-[12px] text-[hsl(var(--cream)/0.3)]">© {new Date().getFullYear()} Ashwin Ugale · built with React, Vite & Tailwind</p>
      </main>
    </div>
  );
};

export default ReadableLayout;
