
import { useState } from 'react';
import { Github, Terminal, Cloud, Database, Server, Docker } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'Multi-Cloud Kubernetes Platform',
      description: 'Designed and deployed a production-grade Kubernetes cluster across AWS, Azure, and GCP with automated scaling, monitoring, and disaster recovery capabilities.',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Container Orchestration',
      tags: ['Kubernetes', 'Helm', 'Istio', 'Prometheus'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Server
    },
    {
      id: 2,
      title: 'Infrastructure as Code Pipeline',
      description: 'Built comprehensive IaC solution using Terraform and Ansible for provisioning AWS infrastructure with GitOps workflow and automated testing.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Infrastructure Automation',
      tags: ['Terraform', 'Ansible', 'GitOps', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Terminal
    },
    {
      id: 3,
      title: 'Cloud-Native CI/CD Platform',
      description: 'Implemented enterprise-grade CI/CD pipeline using Jenkins, Docker, and ArgoCD with automated testing, security scanning, and deployment strategies.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'CI/CD',
      tags: ['Jenkins', 'ArgoCD', 'SonarQube', 'Docker'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Docker
    },
    {
      id: 4,
      title: 'AWS Cost Optimization Suite',
      description: 'Developed automated cost optimization tools that reduced cloud spending by 40% through right-sizing, spot instances, and resource scheduling.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Cloud Optimization',
      tags: ['AWS Lambda', 'CloudWatch', 'Cost Explorer', 'Python'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Cloud
    },
    {
      id: 5,
      title: 'Microservices Monitoring Stack',
      description: 'Deployed comprehensive observability solution with Prometheus, Grafana, Jaeger, and ELK stack for distributed tracing and log aggregation.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Monitoring & Observability',
      tags: ['Prometheus', 'Grafana', 'Elasticsearch', 'Jaeger'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Database
    },
    {
      id: 6,
      title: 'Serverless Data Pipeline',
      description: 'Built scalable data processing pipeline using AWS Lambda, Step Functions, and EventBridge for real-time analytics and machine learning workflows.',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Serverless Architecture',
      tags: ['AWS Lambda', 'Step Functions', 'EventBridge', 'S3'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Server
    }
  ];

  const categories = ['All', 'Container Orchestration', 'Infrastructure Automation', 'CI/CD', 'Cloud Optimization', 'Monitoring & Observability', 'Serverless Architecture'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">DevOps Projects</h2>
          <p className="text-xl text-gray-600 mb-8">
            Infrastructure automation, cloud architecture, and DevOps solutions I've built
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm ${
                activeFilter === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const IconComponent = project.icon;
            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <a
                      href={project.liveUrl}
                      className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Terminal size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 p-2 rounded-full">
                      <IconComponent size={20} className="text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  </div>
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-3 inline-block">
                    {project.category}
                  </span>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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
