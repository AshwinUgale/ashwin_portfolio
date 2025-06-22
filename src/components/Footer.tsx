
import { Github, Terminal, Cloud } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Alex Chen</h3>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              DevOps Engineer & Cloud Architect specializing in scalable infrastructure 
              automation and cloud-native solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">
                <Terminal size={20} />
              </a>
              <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">
                <Cloud size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#projects" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">Projects</a></li>
              <li><a href="#skills" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">Skills</a></li>
              <li><a href="#contact" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">DevOps Services</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>Cloud Architecture</li>
              <li>Infrastructure Automation</li>
              <li>Container Orchestration</li>
              <li>CI/CD Pipeline Design</li>
              <li>Monitoring & Observability</li>
              <li>Cost Optimization</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 dark:border-gray-700 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500">
            © {currentYear} Alex Chen. All rights reserved. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
