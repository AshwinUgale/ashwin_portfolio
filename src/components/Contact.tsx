
import { useState } from 'react';
import { Github, Cloud, Server, Terminal } from 'lucide-react';
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
    console.log('Form submitted:', formData);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out! I'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Let's Build Together</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Ready to optimize your infrastructure? Let's discuss your DevOps challenges!
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Let's Connect
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <Terminal className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300">alex.chen@devops.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <Cloud className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">Seattle, WA (Remote Available)</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <Server className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Response Time</h4>
                  <p className="text-gray-600 dark:text-gray-300">Within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Available for DevOps Consulting
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                I'm currently available for DevOps consulting, cloud migration projects, 
                and infrastructure optimization. Let's automate your deployment pipeline!
              </p>
              <div className="flex space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Available for new projects</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <Terminal className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Type
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Cloud Migration, CI/CD Setup, Infrastructure Audit..."
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell me about your infrastructure challenges and goals..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
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
