import React from 'react';

const SectionHeading = ({
  eyebrow,
  title,
  active,
}: {
  eyebrow: string;
  title: string;
  active?: boolean;
}) => (
  <div className="mb-8">
    <div className={`eyebrow transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}>
      {eyebrow}
    </div>
    <h2
      className={`mt-2 text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-500 ${
        active ? 'text-white' : 'text-slate-300'
      }`}
    >
      {title}
    </h2>
  </div>
);

export default SectionHeading;
