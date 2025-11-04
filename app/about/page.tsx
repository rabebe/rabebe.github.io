import React from 'react';
import Link from 'next/link';

// Static data for the tech stack
const skills = [
  'Next.js / React',
  'TypeScript',
  'Node.js / Express',
  'Ruby on Rails',
  'PostgreSQL',
  'Tailwind CSS / SCSS',
  'Figma / UI/UX Design',
  'Cloud Deployment (AWS/Vercel)',
];

/**
 * The About Me page component.
 */
const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="mb-12 border-b border-gray-200 pb-6">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-2">
            About Me
          </h1>
          <p className="text-xl text-indigo-600 font-medium">
            Building intuitive and scalable web experiences.
          </p>
        </header>

        {/* Introduction and Background */}
        <section className="space-y-8 text-lg text-gray-700 leading-relaxed">
          <p>
            I am a full-stack developer with a deep passion for **clean code architecture** and thoughtful **user experience (UX) design**. My journey began in visual design, which gives me a unique perspective on engineering: I don&apos;t just solve problems—I build solutions that are both robust under the hood and a delight to use.
          </p>

          <p>
            My background includes extensive work with both modern JavaScript frameworks, particularly **React and Next.js**, and powerful backends like **Ruby on Rails**. I thrive in environments where I can bridge the gap between technical feasibility and design excellence, ensuring every project is performant, accessible, and beautiful.
          </p>

          <p>
            I believe that technology should empower, and I am constantly learning new tools and techniques to deliver the best possible results. When I&apos;m not coding, you can find me writing about technical topics on my blog or experimenting with new design patterns.
          </p>
        </section>

        {/* Technical Skills */}
        <div className="mt-16 bg-white p-8 shadow-xl rounded-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
                My Tech Stack
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 list-none p-0 m-0">
                {skills.map((skill, index) => (
                    <li key={index} className="flex items-center text-gray-700 font-medium">
                        <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
        
        {/* Call to Action */}
        <section className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Let&apos;s Build Something Great
            </h2>
            <p className="text-xl text-gray-600 mb-6">
                I&apos;m always open to discussing new projects, collaborations, or job opportunities.
            </p>
            <Link 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
            >
                Get in Touch
            </Link>
        </section>

      </div>
    </main>
  );
};

export default AboutPage;