
import { Cloud, Server, Database, Terminal, Container, Github } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Terminal,
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS']
    },
    {
      title: 'Backend Development',
      icon: Database,
      skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB']
    },
    {
      title: 'Cloud Platforms',
      icon: Cloud,
      skills: ['AWS', 'Azure', 'Google Cloud', 'DigitalOcean']
    },
    {
      title: 'Container & Orchestration',
      icon: Container,
      skills: ['Kubernetes', 'Docker', 'Helm', 'Istio']
    },
    {
      title: 'Infrastructure as Code',
      icon: Terminal,
      skills: ['Terraform', 'Ansible', 'CloudFormation', 'Pulumi']
    },
    {
      title: 'CI/CD & Automation',
      icon: Github,
      skills: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'ArgoCD']
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
          <p className="text-xl text-gray-600 mb-8">
            Full-stack development and DevOps technologies I work with
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div
                key={categoryIndex}
                className="bg-gradient-to-br from-slate-50 to-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <IconComponent className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {category.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-block bg-white px-3 py-2 rounded-lg text-gray-700 font-medium border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications and stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">6+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
            <div className="text-gray-600">AWS Certifications</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime Achievement</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
