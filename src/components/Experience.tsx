
import { Calendar, MapPin, Building, Code } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      company: 'Hyphenova',
      position: 'Full Stack Developer Intern',
      location: 'CA, USA',
      duration: 'June 2024 – December 2024',
      type: 'Internship',
      achievements: [
        'Built 30+ responsive React and TypeScript components with Redux, lazy loading, and code-splitting for 35% faster rendering',
        'Developed RESTful APIs with Node.js, Express, JWT, MongoDB, and Redis, reducing DB queries by 40%',
        'Led Agile sprints and cross-team collaboration via Jira and Figma, ensuring API alignment and 95% on-time delivery',
        'Implemented GitHub Actions CI workflows and Dockerized services for automated testing and deployment'
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Docker', 'GitHub Actions']
    },
    {
      id: 2,
      company: 'Feuchr School of Excellence',
      position: 'Data Science Intern',
      location: 'Mumbai, India',
      duration: 'May 2022 – July 2022',
      type: 'Internship',
      achievements: [
        'Co-developed an insurance website for 10,000+ users, offering personalized premium calculations',
        'Devised a Gradient Boosting model achieving 87% accuracy',
        'Achieved 15% higher user engagement and 20% increase in quote requests'
      ],
      technologies: ['Python', 'Machine Learning', 'Gradient Boosting', 'Web Development']
    },
    {
      id: 3,
      company: 'Image Online',
      position: 'Machine Learning Intern',
      location: 'Mumbai, India',
      duration: 'December 2021 – January 2022',
      type: 'Internship',
      achievements: [
        'Executed comprehensive analysis of diverse advertising channels, identifying opportunities to increase ROI by 15%',
        'Implemented Random Forest Regression to evaluate impact of TV, newspaper, and radio ads on revenue',
        'Achieved 20% improvement in prediction accuracy for individual, pairwise, and cumulative effects'
      ],
      technologies: ['Python', 'Random Forest', 'Data Analysis', 'Machine Learning']
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Professional Experience</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Internships and professional development journey
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8 border-l-4 border-blue-600 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Building className="text-blue-600 dark:text-blue-400 mr-2" size={20} />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {experience.position}
                    </h3>
                  </div>
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {experience.company}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300 mb-4">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">{experience.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span className="text-sm">{experience.duration}</span>
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                      {experience.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Code className="mr-2 text-blue-600 dark:text-blue-400" size={18} />
                  Key Achievements
                </h5>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <li
                      key={achievementIndex}
                      className="flex items-start text-gray-600 dark:text-gray-300"
                    >
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Technologies Used
                </h5>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education section */}
        <div className="mt-16 bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Education</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-slate-100 dark:from-gray-800 dark:to-gray-600 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Master of Science in Computer Science
              </h4>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                Indiana University, Bloomington
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                August 2023 - May 2025
              </p>
              <p className="text-gray-700 dark:text-gray-200 text-sm">
                GPA: 3.6/4.0
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-slate-100 dark:from-gray-800 dark:to-gray-600 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Bachelor of Technology
              </h4>
              <p className="text-green-600 dark:text-green-400 font-medium mb-1">
                K. J. Somaiya Institute of Technology, Mumbai
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                August 2019 - May 2023
              </p>
              <p className="text-gray-700 dark:text-gray-200 text-sm">
                Electronics and Telecommunication Engineering | GPA: 8.99/10
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
