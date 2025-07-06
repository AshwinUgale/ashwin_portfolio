
import { Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-10 md:py-24">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Let's Connect</h2>
        <p className="text-lg text-gray-300 mb-8">
          I am open to work and new opportunities.<br />
          Feel free to contact me!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:ashwin.ugale@gmail.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/ashwinugale/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-800 text-white font-semibold shadow hover:bg-blue-900 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/ashwinugale"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-800 text-white font-semibold shadow hover:bg-gray-900 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
