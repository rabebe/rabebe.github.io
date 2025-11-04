// app/page.tsx

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
      <section className="bg-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base font-semibold text-indigo-600 tracking-wide uppercase mb-3">
            Developer | Designer | Educator
          </p>
          <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
            Hi, I&apos;m <span className="text-indigo-600">Ruth Abebe</span>.
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
            Welcome to my corner of the internet. I build dynamic, robust web applications and am passionate about sharing knowledge in the intersection of design and scalable technology.
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
              className="px-8 py-3 border border-gray-300 text-base font-medium rounded-xl shadow-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-150"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Latest Blog Posts Preview */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Latest Blog Posts
            </h2>
            <Link 
              href="/blog" 
              className="text-lg font-medium text-indigo-600 hover:text-indigo-700 transition duration-150"
            >
              View All Posts &rarr;
            </Link>
          </div>

          {/* Render the latest three posts */}
          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-xl shadow-md border border-gray-200">
              <p className="text-gray-500">
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