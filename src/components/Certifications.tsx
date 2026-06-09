import React from 'react';
import { ExternalLink, Award } from 'lucide-react';
import Band from './Band';
import Reveal from './Reveal';

const certs = [
  {
    name: 'AWS Certified Developer — Associate',
    issuer: 'Amazon Web Services',
    year: '2025',
    badge: '/aws-certified-developer-associate.png',
    url: 'https://www.credly.com/badges/37dccc3c-462b-48a3-9f36-21e1195b0cf2/public_url',
    blurb: 'Developing, deploying & debugging cloud apps on AWS — IAM, Lambda, S3, EC2, and CI/CD.',
  },
];

const Certifications = () => (
  <Band id="certifications" no="07" kicker="certifications" title="Certified.">
    <div className="grid gap-4 md:grid-cols-2">
      {certs.map((c, i) => (
        <Reveal key={c.name} delay={i * 90}>
          <a href={c.url} target="_blank" rel="noopener noreferrer" className="surface ticks group flex h-full items-center gap-5 p-5">
            <img src={c.badge} alt={c.name} className="h-24 w-24 shrink-0 object-contain" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 font-display text-base font-semibold leading-snug text-white">
                <Award size={15} style={{ color: 'hsl(var(--accent))' }} /> {c.name}
              </div>
              <div className="mt-1 font-mono text-[11px] text-white/45">{c.issuer} · {c.year}</div>
              <p className="mt-2 text-[13px] leading-relaxed text-white/55">{c.blurb}</p>
              <span className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] text-white/45 group-hover:text-accent">verify <ExternalLink size={11} /></span>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  </Band>
);

export default Certifications;
