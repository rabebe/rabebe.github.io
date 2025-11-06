import React from 'react';
import Link from 'next/link';

// Static data for the tech stack
const skills = [
  'TypeScript',
  'React / Next.js',
  'Ruby on Rails',
  'PostgreSQL / Firestore',
  'Python',
  'Tailwind CSS',
  'Node.js / Express.js',
  'Pandas / NumPy'
];

/**
 * The About Me page component.
 */
const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        {/* Updated border color and removed light background */}
        <header className="mb-12 border-b border-gray-700 pb-6">
          {/* Changed text-gray-900 to text-white */}
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-2">
            About Me
          </h1>
          <p className="text-xl text-indigo-400 font-medium">
            Building intuitive and scalable web experiences.
          </p>
        </header>

        {/* Introduction and Background */}
        {/* Changed text-gray-700 to text-gray-300 */}
        <section className="space-y-8 text-lg text-gray-300 leading-relaxed">
          <p>
            I am a full-stack developer and a Master’s student in Computer Science, passionate about building thoughtful, reliable systems that solve real-world problems. My journey began in public health and research, which shapes how I approach software: I focus not just on functionality, but on creating solutions that are meaningful and impactful.          </p>

          <p>
            I have experience working across the full stack, from React and Next.js frontends to Ruby on Rails and Python backends, integrating databases and APIs to deliver complete, scalable applications.          </p>

          <p>
            I believe that technology should empower, not just automate. I am fascinated by how emerging tools and platforms can make people’s lives easier, more creative, and more connected.          </p>
        </section>

        {/* Technical Skills */}
        {/* Changed bg-white to bg-gray-800 and updated border color */}
        <div className="mt-16 bg-gray-800 p-8 shadow-xl rounded-xl border border-gray-700">
            {/* Changed text-gray-900 to text-white */}
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                My Tech Stack
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 list-none p-0 m-0">
                {skills.map((skill, index) => (
                    <li key={index} className="flex items-center text-gray-300 font-medium">
                        {/* Changed text-indigo-500 to text-indigo-400 for dark mode */}
                        <svg className="w-5 h-5 text-indigo-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
        
        {/* Call to Action */}
        <section className="mt-16 text-center">
            {/* Changed text-gray-900 to text-white */}
            <h2 className="text-3xl font-bold text-white mb-4">
                Let&apos;s Build Something Great
            </h2>
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