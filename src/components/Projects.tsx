
import { Github, Terminal, Cloud, Database, Server, Container } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Cloud Native Booking Platform',
      description: 'A cloud-native booking platform built with React, Node.js, and Spring Boot. Deployed on Google Kubernetes Engine (GKE) using Docker and GitHub Actions for a complete CI/CD pipeline. Built to deepen my understanding of cloud infrastructure, container orchestration, and automated deployment workflows.',
      category: 'Cloud-Native Application',
      tags: ['React', 'Node.js', 'Spring Boot', 'Docker', 'GKE', 'GitHub Actions'],
      liveUrl: 'http://cloudtix.xyz/',
      githubUrl: 'https://github.com/AshwinUgale/CloudNative-BookingPlatform',
      icon: Cloud
    },
    {
      id: 2,
      title: 'Hospital Database Management System',
      description: 'A full-stack web-based hospital management system built using PHP, JavaScript, and MySQL. The system centralizes core hospital operations such as patient registration, staff scheduling, inventory tracking, and billing into a unified, modular interface.',
      category: 'Database & Workflow Automation',
      tags: ['PHP', 'JavaScript', 'HTML', 'CSS', 'MySQL'],
      liveUrl: '',
      githubUrl: 'https://github.com/AshwinUgale/HospitalManagementSystem',
      icon: Database
    },
    {
      id: 3,
      title: 'Art Gallery Venue Booking System',
      description: 'A full-stack web application built using the MERN stack, designed to streamline the reservation and management of gallery spaces for exhibitions and events. The platform includes real-time communication features and an admin dashboard for managing booking requests and user interactions.',
      category: 'Full-Stack Web Application',
      tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io'],
      liveUrl: '',
      githubUrl: 'https://github.com/AshwinUgale/CSCI-P565',
      icon: Terminal
    },
    {
      id: 4,
      title: 'Cloud Deployments Monitoring',
      description: 'A real-time cloud monitoring dashboard for tracking HTTP status, latency, SSL, and DNS metrics of cloud deployments. Runs on AWS EC2 and visualizes data using Grafana and Prometheus, providing instant insights into uptime, response times, and infrastructure health.',
      category: 'Cloud Monitoring & Observability',
      tags: ['AWS', 'EC2', 'Grafana', 'Prometheus', 'Monitoring'],
      liveUrl: 'http://3.22.70.98:3000/d/xtkCtBkiz/<slug>?orgId=1&kiosk',
      githubUrl: '',
      icon: Server
    },
    {
      id: 5,
      title: 'AWS Cost Optimization Suite',
      description: 'A dashboard and workflow for optimizing the use of free credits and free tier services to deploy my projects. I use this to track and manage cloud costs across multiple providers and keep my deployments efficient and affordable.',
      category: 'Cloud Optimization',
      tags: ['AWS Lambda', 'CloudWatch', 'Cost Explorer', 'Python'],
      liveUrl: '',
      githubUrl: '',
      icon: Cloud
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
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#1e293b] hover:bg-blue-700 text-blue-300 hover:text-white text-xs font-semibold transition-colors border border-blue-700/30 shadow-sm"
                    >
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition-colors shadow-sm"
                    >
                      Demo
                    </a>
                  )}
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

