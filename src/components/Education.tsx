import React from 'react';

const educationData = [
  {
    degree: 'Master of Science in Computer Science',
    school: 'Indiana University',
    years: '2022 — 2024',
    description: 'Focused on full-stack development, cloud computing, and DevOps. Completed projects in scalable web applications, microservices, and CI/CD pipelines.',
    logo: '/image.png',
  },
  {
    degree: 'Bachelor of Engineering in Information Technology',
    school: 'Savitribai Phule Pune University',
    years: '2018 — 2022',
    description: 'Studied core computer science concepts, software engineering, and participated in coding competitions and hackathons.',
    logo: '/image2.png',
  }
];

const Education = () => {
  return (
    <section id="education" className="py-10 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col gap-8">
          {educationData.map((edu, idx) => (
            <div
              key={idx}
              className="group flex flex-col gap-3 p-0"
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-lg bg-white/10 p-2">
                  <img
                    src={edu.logo}
                    alt={edu.school + ' logo'}
                    className="object-contain w-full h-full"
                  />
                </span>
                <div className="flex flex-col">
                  <span className="text-base md:text-lg font-bold text-white leading-tight mb-0.5">{edu.degree}</span>
                  <span className="text-xs text-blue-300 font-medium">{edu.school}</span>
                </div>
                <span className="ml-auto text-xs text-slate-400 md:text-right">{edu.years}</span>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-1">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education; 