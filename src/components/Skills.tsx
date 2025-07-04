
import { Cloud, Server, Database, Terminal, Container, Github, Code, Brain } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    skills: ['Python', 'Java', 'C++', 'C', 'JavaScript', 'PHP', 'R']
  },
  {
    title: 'Web Development',
    icon: Terminal,
    skills: ['React', 'Node.js', 'Spring Boot', 'Express', 'HTML/CSS', 'Bootstrap', 'TypeScript']
  },
  {
    title: 'Databases',
    icon: Database,
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis', 'Oracle']
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    skills: ['GCP', 'AWS (EC2, S3, EKS, RDS)', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD']
  },
  {
    title: 'Machine Learning & Data',
    icon: Brain,
    skills: ['Machine Learning', 'Data Analysis', 'Random Forest', 'Gradient Boosting', 'Python ML Libraries']
  },
  {
    title: 'Tools & Practices',
    icon: Github,
    skills: ['Git', 'Agile', 'Postman', 'REST APIs', 'Microservices', 'Linux/UNIX', 'Shell Scripting']
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-28">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col gap-12">
          <div className="group flex flex-col gap-3 p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {skillCategories.map((category, idx) => {
                const IconComponent = category.icon;
                return (
                  <div key={idx} className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-700/20">
                        <IconComponent className="text-blue-400" size={22} />
                      </span>
                      <span className="text-base font-semibold text-white">{category.title}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill, skillIdx) => (
                        <span
                          key={skillIdx}
                          className="text-sm px-3 py-1.5 rounded bg-white/5 text-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
