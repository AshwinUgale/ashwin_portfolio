
import React from 'react';

const experiences = [
  {
    company: 'Live Risk Labs',
    role: 'DevOps Engineer',
    location: 'NY, USA',
    dates: 'June 2025 – Present',
    bullets: [
      'Provisioned and managed GCP infrastructure using Terraform, including VPCs, GKE clusters, IAM roles, service accounts, and secure networking.',
      'Developed hardened golden images using Ansible and CIS benchmarks, integrating them into automated provisioning pipelines for consistent and compliant deployments.',
      'Streamlined GitOps deployment by integrating ArgoCD with GitHub Actions and Terraform workflows, enabling secure, policy-scanned (Checkov) and auto-synced infrastructure rollouts.'
    ]
  },
  {
    company: 'Hyphenova',
    role: 'Full Stack Developer Intern',
    location: 'California, USA',
    dates: 'June 2024 – December 2024',
    bullets: [
      'Built reusable and responsive React + TypeScript components with Redux, lazy loading, and code-splitting to improve frontend modularity and load performance.',
      'Developed REST APIs with Node.js, Express, JWT, MongoDB, and leveraged Redis for caching, session storage, and API rate limiting, reducing DB load by 40%.',
      'Set up GitHub Actions pipelines with Docker for testing, linting, and builds; enforced standards via Jest, ESLint, Prettier with 85%+ coverage.',
      'Deployed versioned containers to GKE using CI/CD workflows, enabling fully automated, rollback-safe releases.',
      'Led Agile development cycles and coordinated across frontend, backend, and QA to ensure on-time delivery and seamless integration of new features.'
    ]
  },
  {
    company: 'Feuchr School of Excellence',
    role: 'Data Science Intern',
    location: 'Mumbai, India',
    dates: 'May 2022 – July 2022',
    bullets: [
      'Built an insurance pricing model using structured patient data, applying Gradient Boosting to predict risk-adjusted premiums with 87% accuracy.',
      'Improved model generalization via feature selection and cross-validation, reducing MAE by 25% compared to a baseline Linear Regression model.',
      'Delivered insights that improved quote personalization, driving a 20% increase in quote requests and 15% rise in user retention.'
    ]
  },
  {
    company: 'Image Online',
    role: 'Machine Learning Intern',
    location: 'Mumbai, India',
    dates: 'December 2021 – January 2022',
    bullets: [
      'Analyzed multi-channel ad performance data (TV, newspaper, radio) to model revenue impact using Random Forest Regression.',
      'Performed EDA, correlation analysis, and feature scaling to improve model input quality, leading to a 20% improvement in prediction accuracy.',
      'Uncovered actionable insights that informed media budget allocation, contributing to an estimated 15% increase in ROI.'
    ]
  }
];

const Experience = ({ activeSection }: { activeSection?: string }) => {
  return (
    <section id="experience" className="py-10 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-10">
          <div>
            <h2
              className={`text-3xl font-bold mb-6 transition-all duration-700
                ${activeSection === 'experience'
                  ? 'opacity-100 text-blue-400 drop-shadow-lg'
                  : 'opacity-40 text-slate-400'}
              `}
            >
              Experience
            </h2>
            <div className="max-w-4xl mx-auto px-4 flex flex-col gap-12">
              {experiences.map((exp, idx) => (
                <div key={exp.company} className="flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0">
                    <span className="text-xl md:text-2xl font-bold text-white">{exp.company}</span>
                    <span className="text-sm text-slate-400 md:text-right">{exp.dates}</span>
                  </div>
                  <span className="text-base md:text-lg font-semibold text-blue-300">{exp.role}</span>
                  <span className="text-sm text-slate-400 mb-2">{exp.location}</span>
                  <ul className="list-disc list-inside text-gray-300 pl-2 space-y-1">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
