import React from 'react';

/**
 * Renders a standard footer with copyright information.
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {currentYear} Ruth Abebe. All rights reserved.
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Built with Next.js and deployed via Vercel.
        </p>
      </div>
    </footer>
  );
};

export default Footer;