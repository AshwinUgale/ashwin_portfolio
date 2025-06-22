
import { Github, Mail, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Ashwin Ugale</h3>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              Recent Computer Science graduate specializing in full-stack development 
              and cloud-native solutions. Passionate about building scalable applications.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/AshwinUgale" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/ashwin-ugale/" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:ugaleashwin@gmail.com" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#experience" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">Experience</a></li>
              <li><a href="#projects" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">Projects</a></li>
              <li><a href="#skills" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">Skills</a></li>
              <li><a href="#contact" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Areas of Interest</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>Full-Stack Development</li>
              <li>Cloud Computing</li>
              <li>DevOps & CI/CD</li>
              <li>Machine Learning</li>
              <li>Microservices Architecture</li>
              <li>Data Science</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 dark:border-gray-700 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500">
            © {currentYear} Ashwin Ugale. All rights reserved. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
