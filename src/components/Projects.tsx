
import { Github, Terminal, Cloud, Database, Server, Container } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'TaskFlow - Full-Stack Project Management Platform',
      description: 'Built a comprehensive project management SaaS with React, Node.js, PostgreSQL, and Redis. Features real-time collaboration, file uploads, advanced analytics, and automated deployment with Docker and Kubernetes.',
      category: 'Full-Stack Application',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'K8s'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Database
    },
    {
      id: 2,
      title: 'Multi-Cloud Kubernetes Platform',
      description: 'Designed and deployed a production-grade Kubernetes cluster across AWS, Azure, and GCP with automated scaling, monitoring, and disaster recovery capabilities.',
      category: 'Container Orchestration',
      tags: ['Kubernetes', 'Helm', 'Istio', 'Prometheus'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Server
    },
    {
      id: 3,
      title: 'Infrastructure as Code Pipeline',
      description: 'Built comprehensive IaC solution using Terraform and Ansible for provisioning AWS infrastructure with GitOps workflow and automated testing.',
      category: 'Infrastructure Automation',
      tags: ['Terraform', 'Ansible', 'GitOps', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Terminal
    },
    {
      id: 4,
      title: 'Cloud-Native CI/CD Platform',
      description: 'Implemented enterprise-grade CI/CD pipeline using Jenkins, Docker, and ArgoCD with automated testing, security scanning, and deployment strategies.',
      category: 'CI/CD',
      tags: ['Jenkins', 'ArgoCD', 'SonarQube', 'Docker'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Container
    },
    {
      id: 5,
      title: 'AWS Cost Optimization Suite',
      description: 'Developed automated cost optimization tools that reduced cloud spending by 40% through right-sizing, spot instances, and resource scheduling.',
      category: 'Cloud Optimization',
      tags: ['AWS Lambda', 'CloudWatch', 'Cost Explorer', 'Python'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Cloud
    },
    {
      id: 6,
      title: 'Microservices Monitoring Stack',
      description: 'Deployed comprehensive observability solution with Prometheus, Grafana, Jaeger, and ELK stack for distributed tracing and log aggregation.',
      category: 'Monitoring & Observability',
      tags: ['Prometheus', 'Grafana', 'Elasticsearch', 'Jaeger'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Database
    }
  ];

  return (
    <section id="projects" className="py-10 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col gap-8">
          {projects.map((project) => {
            const IconComponent = project.icon;
            return (
              <div
                key={project.id}
                className="group rounded-2xl p-5 md:p-7 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-blue-700 via-blue-500 to-blue-300 shadow-md">
                    <IconComponent size={26} className="text-white" />
                  </span>
                  <div className="flex flex-col">
                    <h3 className="text-base md:text-lg font-semibold text-white leading-tight mb-0.5">
                      {project.title}
                    </h3>
                    <span className="text-xs text-blue-300 font-medium">{project.category}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-transparent text-gray-300 px-2 py-1 rounded-full border border-blue-400/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#1e293b] hover:bg-blue-700 text-blue-300 hover:text-white text-xs font-semibold transition-colors border border-blue-700/30 shadow-sm"
                  >
                    Code
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition-colors shadow-sm"
                  >
                    Demo
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;

