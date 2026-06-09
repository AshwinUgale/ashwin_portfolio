import CommandBar from '@/components/CommandBar';
import CommandPalette from '@/components/CommandPalette';
import HeroConsole from '@/components/HeroConsole';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import OtherProjects from '@/components/OtherProjects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Certifications from '@/components/Certifications';
import Terminal from '@/components/Terminal';
import { openTerminal, LINKS } from '@/lib/nav';

const Closing = () => (
  <section className="relative border-t border-white/10 px-5 py-24 md:px-12">
    <div className="mx-auto max-w-5xl">
      <div className="mono-label mb-4" style={{ color: 'hsl(var(--accent))' }}>// end of stream</div>
      <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
        Let's build<br />something with <span style={{ color: 'hsl(var(--accent))' }}>agents.</span>
      </h2>
      <p className="mt-5 max-w-lg text-white/55">
        Open to AI/LLM engineering, applied agent platforms, and backend roles. Ask my portfolio
        anything, or reach out directly.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <button onClick={() => openTerminal()} className="btn-term-solid">▶ ask my portfolio</button>
        <a href={LINKS.email} className="btn-term">ugaleashwin@gmail.com</a>
      </div>
      <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-6 font-mono text-[11px] text-white/35">
        <span>© {new Date().getFullYear()} ashwin ugale</span>
        <span>built with react · vite · tailwind</span>
      </div>
    </div>
  </section>
);

const Index = () => (
  <div className="relative min-h-screen">
    <div className="bg-canvas" />
    <div className="bg-glow" />
    <div className="bg-scan" />
    <div className="relative z-10">
      <CommandBar />
      <CommandPalette />
      <main>
        <HeroConsole />
        <About />
        <Experience />
        <Projects />
        <OtherProjects />
        <Skills />
        <Education />
        <Certifications />
        <Closing />
      </main>
      <Terminal />
    </div>
  </div>
);

export default Index;
