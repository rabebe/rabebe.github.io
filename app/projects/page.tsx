import React from 'react';
import Link from 'next/link';

const projects = [
  {
    title: 'Full-Stack Caching API Proxy',
    description: 'A fast, modern storefront built with Next.js, decoupled from a CMS or proprietary backend. Focuses on performance, SEO, and seamless checkout integration.',
    stack: ['Next.js', 'TypeScript', 'Stripe API', 'GraphQL', 'Vercel'],
    liveUrl: 'https://api-caching-proxy.vercel.app/',
    repoUrl: 'https://github.com/rabebe/api-caching-proxy',
  },
  {
    title: 'Personal Website + Integrated Blog',
    description: 'A data-driven dashboard designed for educators to track student progress and identify learning gaps. Built with Node.js and D3.js for complex visualizations.',
    stack: ['Node.js', 'Express', 'D3.js', 'MongoDB', 'Passport.js'],
    liveUrl: '/blog',
    repoUrl: 'https://github.com/rabebe/blog-api',
  },
  {
    title: 'Summarization Workflow Service',
    description: 'The very API powering this website! A simple, RESTful backend for managing and serving blog posts, designed for high performance and scalability.',
    stack: ['Ruby on Rails', 'PostgreSQL', 'RSpec', 'Docker'],
    liveUrl: 'https://ai-chatbot-83je.onrender.com/',
    repoUrl: 'https://github.com/rabebe/ai-chatbot',
  },
];

/**
 * A reusable component for rendering a project card.
 */
const ProjectCard: React.FC<{ project: typeof projects[0] }> = ({ project }) => (
    <div className="bg-white p-8 shadow-xl rounded-xl border border-gray-100 flex flex-col h-full transition-transform duration-300 hover:shadow-2xl hover:border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h2>
        <p className="text-gray-600 mb-6 flex-grow">{project.description}</p>
        
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
                <span 
                    key={tech} 
                    className="px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full"
                >
                    {tech}
                </span>
            ))}
        </div>

        {/* Action Links */}
        <div className="mt-auto flex space-x-4">
            <Link 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition duration-150"
            >
                View Live &rarr;
            </Link>
            <Link 
                href={project.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-600 font-semibold hover:text-gray-800 transition duration-150"
            >
                View Code
            </Link>
        </div>
    </div>
);


/**
 * The main Projects Page component.
 */
const ProjectsPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A selection of key projects demonstrating proficiency in full-stack development, from real-time applications to robust API design.
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

      </div>
    </main>
  );
};

export default ProjectsPage;