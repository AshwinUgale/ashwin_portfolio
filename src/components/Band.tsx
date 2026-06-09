import React from 'react';
import Reveal from './Reveal';

const Band = ({
  id,
  no,
  kicker,
  title,
  children,
}: {
  id: string;
  no: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section id={id} className="relative border-t border-white/10 px-5 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <div className="mono-label mb-2 flex items-center gap-2">
                <span className="text-accent">{no}</span>
                <span className="text-white/20">/</span>
                <span>{kicker}</span>
              </div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
                {title}
              </h2>
            </div>
            <div className="hidden h-px flex-1 translate-y-[-6px] bg-gradient-to-r from-white/15 to-transparent md:block" />
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
};

export default Band;
