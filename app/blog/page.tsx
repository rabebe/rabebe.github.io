import React from 'react';
import PostCard from '../../components/PostCard'; // Adjust path as necessary
import { getAllPosts } from '../../lib/api'; // Removed Post from import

// Define the Post interface locally to ensure it includes all required properties for this file.
interface Post {
  id: number;
  title: string;
  body: string;
  user_id: number;
  published_at: string;
}

/**
 * The main Blog Listing page component.
 * It uses server-side fetching to get all posts.
 */
const BlogPage = async () => {
  // 1. Fetch all posts from the Rails API and cast the result to our locally defined Post interface
  const allPosts: Post[] = await getAllPosts() as Post[];

  // Sort posts by creation date in descending order (newest first)
  const sortedPosts = allPosts.sort((a, b) => {
    // Convert date strings to numbers for comparison
    // TypeScript error is now resolved because 'published_at' exists on the Post type
    const dateA = new Date(a.published_at).getTime();
    const dateB = new Date(b.published_at).getTime();
    return dateB - dateA; // Sort descending
  });

  return (
    // Removed bg-gray-50 to inherit dark background
    <main className="min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="text-center mb-12 border-b border-gray-700 pb-6">
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-2">
            The Blog
          </h1>
          <p className="text-xl text-indigo-400 max-w-3xl mx-auto">
            A space for reflections I wrote while building this project, powered by my own blog API.          </p>
        </header>

        {/* Post Grid */}
        {sortedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sortedPosts.map((post) => (
              // Assuming PostCard is updated for dark mode
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div 
            // Changed bg-white to bg-gray-800, border-gray-200 to border-gray-700
            className="text-center py-20 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
          >
            {/* Changed text-gray-900 to text-white */}
            <h2 className="text-3xl font-bold text-white mb-4">No Posts Found</h2>
            {/* Changed text-gray-500 to text-gray-400 */}
            <p className="text-gray-400 max-w-lg mx-auto">
              It looks like your Rails API is running, but there are no blog posts to display yet. 
              Run `rails db:seed` in your Rails project to load the initial sample posts!
            </p>
          </div>
        )}

      </div>
    </main>
  );
};

export default BlogPage;