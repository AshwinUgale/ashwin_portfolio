import React from 'react';
import Band from './Band';
import Reveal from './Reveal';

const education = [
  { degree: 'M.S. Computer Science', school: 'Indiana University Bloomington', gpa: '3.61 / 4', years: '2023 — 2025', logo: '/image.png' },
  { degree: 'B.Tech Electronics & Telecom', school: 'K. J. Somaiya Institute of Technology', gpa: '8.99 / 10', years: '2019 — 2023', logo: '/image2.png' },
];

const Education = () => (
  <Band id="education" no="06" kicker="education" title="Where I studied.">
    <div className="grid gap-4 md:grid-cols-2">
      {education.map((e, i) => (
        <Reveal key={e.school} delay={i * 90}>
          <div className="surface flex h-full items-center gap-4 p-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-white/10 p-1.5" style={{ borderRadius: '5px' }}>
              <img src={e.logo} alt={e.school} className="h-full w-full object-contain" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <span className="font-display text-[15px] font-semibold leading-snug text-white">{e.degree}</span>
                <span className="shrink-0 font-mono text-[11px] text-white/40">{e.years}</span>
              </div>
              <div className="mt-0.5 text-sm" style={{ color: 'hsl(var(--accent))' }}>{e.school}</div>
              <div className="font-mono text-[11px] text-white/40">gpa {e.gpa}</div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </Band>
);

export default Education;
