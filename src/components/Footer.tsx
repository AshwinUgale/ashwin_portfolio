
import { Github, Mail, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-black to-gray-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Ashwin Ugale</h3>
            <p className="text-gray-300 dark:text-gray-400 mb-6 text-lg leading-relaxed">
              Recent Computer Science graduate specializing in full-stack development 
              and cloud-native solutions. Passionate about building scalable applications.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/AshwinUgale" className="group p-3 bg-white/10 backdrop-blur-sm border border-gray-700/20 rounded-2xl text-gray-300 dark:text-gray-400 hover:text-white hover:bg-white/20 hover:border-gray-600/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Github size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://linkedin.com/in/ashwin-ugale/" className="group p-3 bg-white/10 backdrop-blur-sm border border-gray-700/20 rounded-2xl text-gray-300 dark:text-gray-400 hover:text-white hover:bg-white/20 hover:border-gray-600/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Linkedin size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="mailto:ugaleashwin@gmail.com" className="group p-3 bg-white/10 backdrop-blur-sm border border-gray-700/20 rounded-2xl text-gray-300 dark:text-gray-400 hover:text-white hover:bg-white/20 hover:border-gray-600/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Mail size={24} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block">Home</a></li>
              <li><a href="#about" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block">About</a></li>
              <li><a href="#experience" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block">Experience</a></li>
              <li><a href="#projects" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block">Projects</a></li>
              <li><a href="#skills" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block">Skills</a></li>
              <li><a href="#contact" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Areas of Interest</h4>
            <ul className="space-y-3 text-gray-300 dark:text-gray-400">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></div>
                Full-Stack Development
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mr-3"></div>
                Cloud Computing
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mr-3"></div>
                DevOps & CI/CD
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mr-3"></div>
                Machine Learning
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full mr-3"></div>
                Microservices Architecture
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-3"></div>
                Data Science
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800/50 dark:border-gray-700/50 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-lg">
            © {currentYear} Ashwin Ugale. All rights reserved. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
