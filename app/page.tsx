import React from 'react';
import Link from 'next/link';
// Using relative paths to bypass potential alias issues
import PostCard from '../components/PostCard'; 
import { getAllPosts, Post } from '../lib/api'; 

/**
 * The main landing page component.
 * It uses async to fetch data directly on the server.
 */
const HomePage = async () => {
  // 1. Fetch all posts and slice the array to get the 3 latest posts for the preview
  const allPosts: Post[] = await getAllPosts();
  const latestPosts = allPosts.slice(0, 3); // Get the first 3 posts

  return (
    <main className="min-h-screen">
      
      {/* 1. Hero Section: Introduction */}
      {/* Removed bg-white to inherit the dark background */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base font-semibold text-indigo-400 tracking-wide uppercase mb-3">
            Full-Stack Developer | MSc Student
          </p>
          <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Hi, I&apos;m <span className="text-indigo-400">Ruth Abebe</span>.
          </h1>
          {/* Changed text-gray-600 to text-gray-300 for visibility on dark background */}
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
            Full-stack developer with a background in public health, passionate about building intelligent, impactful software.
          </p>
          
          <div className="mt-10 flex justify-center space-x-4">
            <Link 
              href="/projects" 
              className="px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
            >
              View Projects
            </Link>
            <Link 
              href="/contact" 
              // Updated to dark-mode compliant button styles
              className="px-8 py-3 border border-gray-600 text-base font-medium rounded-xl shadow-lg text-gray-100 bg-gray-700 hover:bg-gray-600 transition duration-150"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Latest Blog Posts Preview */}
      {/* Removed bg-gray-50 to inherit the dark background */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-between items-center mb-10">
            {/* Changed text-gray-900 to text-white */}
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Latest Blog Posts
            </h2>
            <Link 
              href="/blog" 
              className="text-lg font-medium text-indigo-400 hover:text-indigo-300 transition duration-150"
            >
              View All Posts &rarr;
            </Link>
          </div>

          {/* Render the latest three posts */}
          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                // Assuming PostCard is dark-mode friendly or you'll update it later
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            // FIX: Removed extraneous curly braces {} around the fallback JSX block
            <div className="text-center py-10 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
              {/* Changed text-gray-500 to text-gray-400 */}
              <p className="text-gray-400">
                No recent posts available. Start your Rails API to see content here!
              </p>
            </div>
          )}

        </div>
      </section>

    </main>
  );
};

export default HomePage;