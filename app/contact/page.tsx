// app/contact/page.tsx
'use client'; 

import React from 'react';

// Using inline SVG icons
const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.25 0 6.8-.9 6.8-7.5 0-1.5-3-2.6-3-2.6S16.5 2 12 2C7.5 2 4.2 3.8 4.2 3.8S1 4.9 1 6.4c0 6.6 3.55 7.5 6.8 7.5a4.8 4.8 0 0 0-1 3.5v4"></path>
    <path d="M12 4V2"></path>
    <path d="M14 10a2 2 0 0 0-4 0"></path>
  </svg>
);

const ContactPage: React.FC = () => {
  
  // NOTE: Use your actual contact details here
  const myEmail = "ruthgabebe@gmail.com"; 
  const linkedinUrl = "https://linkedin.com/in/ruth-abebe";
  const githubUrl = "https://github.com/rabebe";

  return (
    <main className="min-h-screen bg-gray-50 py-16 sm:py-24">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Feel free to connect directly via these channels.
          </p>
        </header>

        {/* Static Contact Info Container */}
        <div className="bg-white p-8 md:p-12 shadow-2xl rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Direct Contact Methods</h2>
            
            <div className="space-y-8">
                
                {/* Email Link */}
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <MailIcon className="w-8 h-8 text-teal-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Email Address</h3>
                    <a 
                        href={`mailto:${myEmail}`} 
                        className="text-teal-600 hover:text-teal-800 transition duration-150 break-words font-medium"
                    >
                        {myEmail}
                    </a>
                    <p className="mt-1 text-sm text-gray-500">
                        The best way to reach me for professional inquiries.
                    </p>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                    
                    {/* LinkedIn */}
                    <a 
                      href={linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition duration-150 group"
                    >
                      <LinkedinIcon className="w-6 h-6 mr-4 flex-shrink-0 text-blue-600 group-hover:text-blue-700" />
                      <span className="font-medium text-lg">LinkedIn</span>
                      <span className="ml-auto text-base text-gray-500 group-hover:text-teal-600 group-hover:underline">/ruth-abebe</span>
                    </a>
                    
                    {/* GitHub */}
                    <a 
                      href={githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition duration-150 group"
                    >
                      <GithubIcon className="w-6 h-6 mr-4 flex-shrink-0 text-gray-800 group-hover:text-black" />
                      <span className="font-medium text-lg">GitHub</span>
                      <span className="ml-auto text-base text-gray-500 group-hover:text-teal-600 group-hover:underline">/rabebe</span>
                    </a>

                </div>
            </div>
        </div>

      </div>
    </main>
  );
};

export default ContactPage;