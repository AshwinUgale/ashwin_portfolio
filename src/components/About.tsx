
import { Cloud, Database, Server, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-slate-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Recent CS Graduate & Full-Stack Developer
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                I'm a passionate full-stack developer with a Master's in Computer Science from Indiana University 
                and hands-on experience in building cloud-native applications. I specialize in modern web 
                technologies and DevOps practices to deliver scalable solutions.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                My experience spans from React and Node.js development to Kubernetes orchestration 
                and CI/CD automation. I'm eager to contribute to innovative projects and continue 
                growing my expertise in full-stack development and cloud technologies.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <GraduationCap className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Education</p>
                  <p className="font-semibold text-gray-900 dark:text-white">MS in CS</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Server className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                  <p className="font-semibold text-gray-900 dark:text-white">Full-Stack & DevOps</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Database className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Focus</p>
                  <p className="font-semibold text-gray-900 dark:text-white">Backend Development</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Full-Stack Development"
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-blue-200 to-green-200 dark:from-blue-900 dark:to-green-900 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
