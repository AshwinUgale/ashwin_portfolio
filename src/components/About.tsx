
import { Cloud, Database, Server } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-slate-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Full-Stack Developer & DevOps Engineer
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                I'm a passionate full-stack developer with over 6 years of experience building 
                scalable web applications and automating infrastructure. I specialize in modern 
                web technologies, cloud platforms, and DevOps practices to deliver end-to-end solutions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                My expertise spans from React and Node.js development to Kubernetes orchestration 
                and CI/CD automation. I believe in writing clean, maintainable code while ensuring 
                robust deployment pipelines and infrastructure as code.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Cloud className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-semibold">6+ Years</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Server className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Specialization</p>
                  <p className="font-semibold">Full-Stack & DevOps</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Database className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Focus</p>
                  <p className="font-semibold">Scalable Solutions</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white p-8 rounded-2xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Full-Stack Development"
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-blue-200 to-green-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
