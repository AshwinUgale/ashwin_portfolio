import React from 'react';

const education = [
  {
    degree: 'Master of Science in Computer Science',
    school: 'Indiana University',
    gpa: 'GPA: 3.61/4',
    years: '2023 – 2025',
    logo: '/Ashwin_portfolio/image.png',
    note: 'Developed the Venue Booking project as a major coursework assignment for the Software Engineering course, focusing on real-world application design, implementation, and deployment.'
  },
  {
    degree: 'Bachelor of Technology in Electronics and Telecommunication Engineering',
    school: 'K. J. Somaiya Institute of Technology',
    gpa: 'GPA: 8.99/10',
    years: '2019 – 2023',
    logo: '/Ashwin_portfolio/image2.png',
    note: 'Developed the Hospital Management project in collaboration with a local hospital and the university, transitioning the hospital from traditional paper-based methods to a digital system.'
  }
];

const Education = ({ activeSection }: { activeSection?: string }) => {
  return (
    <section id="education" className="py-10 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-10">
          <div>
            <h2
              className={`text-3xl font-bold mb-6 transition-all duration-700
                ${activeSection === 'education'
                  ? 'opacity-100 text-blue-400 drop-shadow-lg'
                  : 'opacity-40 text-slate-400'}
              `}
            >
              Education
            </h2>
            <div className="flex flex-col gap-8">
              {education.map((edu, idx) => (
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
                      {edu.gpa && (
                        <span className="text-xs text-blue-200 font-normal">{edu.gpa}</span>
                      )}
                    </div>
                    <span className="ml-auto text-xs text-slate-400 md:text-right">{edu.years}</span>
                  </div>
                  {edu.note && (
                    <div className="text-sm text-slate-300 mt-1">{edu.note}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education; 