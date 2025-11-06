import React from 'react';
import Link from 'next/link';

const projects = [
    {
    title: 'Self-Correcting Summarization Agent: RefineBot',
    description: 'An intelligent summarization service that automatically refines and corrects its output through iterative self-evaluation. Exposes a REST API for external integration with real-time processing updates.',
    stack: ['Python', 'LangGraph', 'Flask', 'Gemini API'],
    liveUrl: 'https://ai-chatbot-83je.onrender.com/',
    repoUrl: 'https://github.com/rabebe/ai-chatbot',
  },
  {
    title: 'Full-Stack Caching API Proxy',
    description: 'A caching proxy for a weather app that reduces API latency and optimizes network efficiency through intelligent cache management. Handles cache hits, TTL-based invalidation, and rate-limiting to deliver fast, reliable responses while minimizing unnecessary external API calls.',
    stack: ['Next.js', 'TypeScript', 'Firestore', 'Vercel'],
    liveUrl: 'https://api-caching-proxy.vercel.app/',
    repoUrl: 'https://github.com/rabebe/api-caching-proxy',
  },
  {
    title: 'Personal Website + Integrated Blog',
    description: 'A responsive portfolio and blogging platform with a decoupled architecture, combining a robust backend API with a modern frontend. Designed for content management flexibility and automated deployment.',
    stack: ['Ruby on Rails', 'PostgreSQL', 'Next.js', 'Typescript'],
    liveUrl: '/blog',
    repoUrl: 'https://github.com/rabebe/blog-api',
  }
];

/**
 * A reusable component for rendering a project card, now styled for dark mode.
 */
const ProjectCard: React.FC<{ project: typeof projects[0] }> = ({ project }) => (
    <div 
        // Changed bg-white to bg-gray-800, border-gray-100 to border-gray-700
        className="bg-gray-800 p-8 shadow-xl rounded-xl border border-gray-700 flex flex-col h-full transition-transform duration-300 hover:shadow-2xl hover:border-indigo-500"
    >
        {/* Changed text-gray-900 to text-white */}
        <h2 className="text-2xl font-bold text-white mb-3">{project.title}</h2>
        {/* Changed text-gray-600 to text-gray-300 */}
        <p className="text-gray-300 mb-6 flex-grow">{project.description}</p>
        
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
                <span 
                    key={tech} 
                    // Changed bg-indigo-100 to bg-indigo-900/50 and text-indigo-700 to text-indigo-300
                    className="px-3 py-1 text-xs font-medium text-indigo-300 bg-indigo-900/50 rounded-full"
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
                // Changed text-indigo-600 to text-indigo-400
                className="inline-flex items-center text-indigo-400 font-semibold hover:text-indigo-300 transition duration-150"
            >
                View Live &rarr;
            </Link>
            <Link 
                href={project.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                // Changed text-gray-600 to text-gray-400
                className="inline-flex items-center text-gray-400 font-semibold hover:text-gray-300 transition duration-150"
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
    // Removed bg-gray-50 to inherit dark background
    <main className="min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="text-center mb-12">
          {/* Changed text-gray-900 to text-white */}
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-4">
            My Projects
          </h1>
          <p className="text-xl text-indigo-400 max-w-3xl mx-auto">
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