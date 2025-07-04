
import { useState } from 'react';
import { Github, Cloud, Server, Terminal, Mail, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out! I'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-10 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Removed main heading */}
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-10">
            <h3 className="text-2xl font-semibold text-white mb-8">Let's Connect</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-6 p-0">
                <div className="p-4">
                  <Mail className="text-blue-400" size={28} />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Email</h4>
                  <p className="text-gray-400">ashwin.ugale@example.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 p-0">
                <div className="p-4">
                  <MapPin className="text-blue-400" size={28} />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Location</h4>
                  <p className="text-gray-400">Indiana, USA (Remote Available)</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 p-0">
                <div className="p-4">
                  <Clock className="text-blue-400" size={28} />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Response Time</h4>
                  <p className="text-gray-400">Within 24 hours</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Available for Full-Stack Development</h4>
              <p className="text-gray-400 mb-6 text-base leading-relaxed">
                I'm currently available for full-stack development projects, cloud-native applications, 
                and DevOps consulting. Let's build something amazing together!
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400 font-medium">Available for new projects</span>
              </div>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-3">
                    Name
                  </label>
                  <div className="relative">
                    <Terminal className="absolute left-4 top-4 text-gray-400" size={20} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-transparent border border-blue-400/30 text-white rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-500"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-transparent border border-blue-400/30 text-white rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-3">
                  Project Type
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-transparent border border-blue-400/30 text-white rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-500"
                  placeholder="Web App, Cloud Migration, CI/CD Setup..."
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 bg-transparent border border-blue-400/30 text-white rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none placeholder-gray-500"
                  placeholder="Tell me about your project requirements and goals..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-8 rounded-2xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
