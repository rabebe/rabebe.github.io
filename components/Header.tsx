'use client'; // This directive fixes the error by marking it as a client component

import React, { useState } from 'react';

// Reverting to standard anchor tags <a> for compatibility, 
// since the 'next/link' import failed to resolve.
const NavLink: React.FC<{ href: string, label: string, className: string, onClick?: () => void }> = ({ href, label, className, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className={className}
  >
    {label}
  </a>
);

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

/**
 * The main navigation header for the website, styled for dark mode with a dark gray background and indigo accents.
 */
const Header: React.FC = () => {
  // useState is used here, typically for mobile menu toggle functionality
  const [isOpen, setIsOpen] = useState(false); 

  return (
    // Set background to a dark gray for continuity with body, and use indigo accents.
    <header className="sticky top-0 z-40 bg-gray-900 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo/Name - Now using the indigo accent color */}
          <NavLink 
            href="/" 
            label="Ruth Abebe"
            className="text-2xl font-extrabold tracking-tight text-indigo-400 hover:text-indigo-300 transition duration-150 ease-in-out"
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                // Light text with an indigo hover state
                className="text-gray-300 hover:text-indigo-400 font-medium transition duration-150 ease-in-out"
              />
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-indigo-400 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        // Darker shade for the drawer background
        <nav className="md:hidden px-4 pb-4 bg-gray-800">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              onClick={() => setIsOpen(false)} // Close menu on click
              className="block py-2 text-base font-medium text-gray-200 hover:bg-gray-700 rounded-lg transition duration-150"
            />
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;