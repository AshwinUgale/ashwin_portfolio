
import { Cloud, Database, Server, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-10 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-10">
          <div>
            <p className="text-gray-300 leading-relaxed mb-4">
              I'm a Software Engineer with a strong background in full-stack development, cloud infrastructure, and DevOps. I specialize in building scalable systems across the stack—developing frontend interfaces with React, backend services with Java, Spring Boot, and Node.js. I’ve deployed applications on AWS and GCP using Docker, Kubernetes, and CI/CD pipelines, with a focus on clean deployments, secure APIs, and workflow automation.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              What drives me is solving real-world engineering problems and optimizing workflows. Whether it's reducing deployment friction, improving infrastructure resilience, or automating routine tasks, I enjoy working across the stack to bring clarity and efficiency to complex systems.
            </p>
            <p className="text-gray-400 leading-relaxed">
              I hold a Master’s degree in Computer Science from Indiana University and continuously seek opportunities to learn, build, and contribute to impactful software projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
