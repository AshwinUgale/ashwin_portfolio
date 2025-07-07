
import React from 'react';

const skills = [
  {
    category: 'Programming Languages',
    items: ['Python', 'Java', 'C++', 'C', 'PHP', 'R'],
  },
  {
    category: 'Operating Systems',
    items: ['Linux', 'UNIX', 'BSD', 'Shell Scripting'],
  },
  {
    category: 'Networking',
    items: ['TCP/IP', 'Load Balancing', 'HTTP', 'DNS', 'CDN'],
  },
  {
    category: 'Databases',
    items: ['SQL', 'MongoDB', 'Firebase', 'RDBMS', 'Oracle', 'MySQL', 'PostgreSQL'],
  },
  {
    category: 'Web Development',
    items: ['React', 'Node.js', 'Spring Boot', 'Express', 'Bootstrap', 'HTML', 'CSS', 'JavaScript', 'MERN'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['GCP', 'AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Helm', 'Prometheus', 'Grafana', 'CI/CD'],
  },
  {
    category: 'Tools & Practices',
    items: ['Agile', 'Git', 'Postman', 'REST APIs', 'Microservice Architecture', 'Data Structures & Algorithms'],
  },
];

const Skills = ({ activeSection }: { activeSection?: string }) => {
  return (
    <section id="skills" className="py-10 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h2
          className={`text-3xl font-bold mb-6 transition-all duration-700
            ${activeSection === 'skills'
              ? 'opacity-100 text-blue-400 drop-shadow-lg'
              : 'opacity-40 text-slate-400'}
          `}
        >
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, idx) => (
            <div key={skill.category}>
              <h4 className="text-lg font-semibold text-blue-300 mb-2">{skill.category}</h4>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span key={item} className="text-sm bg-white/5 text-gray-200 px-3 py-1.5 rounded">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
