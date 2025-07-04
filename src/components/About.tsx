
import { Cloud, Database, Server, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-10 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-10">
          <div>
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">
              Recent CS Graduate & Full-Stack Developer
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              I'm a passionate full-stack developer with a Master's in Computer Science from Indiana University 
              and hands-on experience in building cloud-native applications. I specialize in modern web 
              technologies and DevOps practices to deliver scalable solutions.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My experience spans from React and Node.js development to Kubernetes orchestration 
              and CI/CD automation. I'm eager to contribute to innovative projects and continue 
              growing my expertise in full-stack development and cloud technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
