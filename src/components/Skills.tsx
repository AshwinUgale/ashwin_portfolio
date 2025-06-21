
import { Cloud, Server, Database, Terminal, Docker, Github } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Cloud Platforms',
      icon: Cloud,
      skills: [
        { name: 'AWS', level: 95 },
        { name: 'Azure', level: 85 },
        { name: 'Google Cloud', level: 80 },
        { name: 'DigitalOcean', level: 75 }
      ]
    },
    {
      title: 'Container & Orchestration',
      icon: Docker,
      skills: [
        { name: 'Kubernetes', level: 90 },
        { name: 'Docker', level: 95 },
        { name: 'Helm', level: 85 },
        { name: 'Istio', level: 75 }
      ]
    },
    {
      title: 'Infrastructure as Code',
      icon: Terminal,
      skills: [
        { name: 'Terraform', level: 90 },
        { name: 'Ansible', level: 85 },
        { name: 'CloudFormation', level: 80 },
        { name: 'Pulumi', level: 70 }
      ]
    },
    {
      title: 'CI/CD & Automation',
      icon: Github,
      skills: [
        { name: 'Jenkins', level: 90 },
        { name: 'GitLab CI', level: 85 },
        { name: 'GitHub Actions', level: 88 },
        { name: 'ArgoCD', level: 82 }
      ]
    },
    {
      title: 'Monitoring & Observability',
      icon: Database,
      skills: [
        { name: 'Prometheus', level: 90 },
        { name: 'Grafana', level: 88 },
        { name: 'ELK Stack', level: 85 },
        { name: 'Datadog', level: 80 }
      ]
    },
    {
      title: 'Operating Systems',
      icon: Server,
      skills: [
        { name: 'Linux', level: 95 },
        { name: 'Ubuntu/Debian', level: 90 },
        { name: 'CentOS/RHEL', level: 85 },
        { name: 'Windows Server', level: 75 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
          <p className="text-xl text-gray-600 mb-8">
            Cloud platforms, DevOps tools, and technologies I work with
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div
                key={categoryIndex}
                className="bg-gradient-to-br from-slate-50 to-gray-50 p-8 rounded-2xl border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <IconComponent className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        <span className="text-blue-600 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications and stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600">Cloud Projects</div>
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
