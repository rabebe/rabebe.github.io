import React from 'react';
import Link from 'next/link';
import { Post } from '@/lib/api';
import FormattedContent from './FormattedContent';

interface PostCardProps {
  post: Post;
}

/**
 * Helper function to format the date string.
 */
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * A reusable card component to display a summary of a blog post.
 * It links to the full post using the post's ID as the slug.
 */
const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Use the post ID as the unique identifier for the URL
  const postUrl = `/blog/${post.id}`;
  const previewContent = post.body.substring(0, 150) + '...';

  return (
    <div 
        // Changed bg-white to bg-gray-800, border-gray-100 to border-gray-700
        className="bg-gray-800 p-6 shadow-xl rounded-xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 border border-gray-700 hover:border-indigo-500"
    >
      
      {/* Date and Metadata */}
      {/* Changed text-indigo-600 to text-indigo-400 */}
      <p className="text-sm font-medium text-indigo-400 mb-2">
        Posted on {formatDate(post.published_at)}
      </p>

      {/* Post Title - Link to full post */}
      {/* Changed text-gray-900 to text-white and hover:text-indigo-700 to hover:text-indigo-400 */}
      <h2 className="text-2xl font-bold text-white mb-3 leading-snug">
        <Link href={postUrl} className="hover:text-indigo-400 transition duration-150">
          {post.title}
        </Link>
      </h2>

      {/* Snippet of the Post Body */}
      {/* Changed text-gray-600 to text-gray-300 */}
      <div className="text-gray-300 mb-4 line-clamp-3">
        {/* 3. Render the preview content using the Markdown component */}
        <FormattedContent 
            content={previewContent} 
            // Setting isDebug to false explicitly (or omitting it) 
            // ensures the Markdown is rendered, not the debug view.
            isDebug={false}
        />
      </div>

      {/* Read More Link */}
      {/* Changed text-indigo-600 to text-indigo-400 and hover:text-indigo-700 to hover:text-indigo-300 */}
      <Link href={postUrl} className="inline-flex items-center text-indigo-400 font-semibold hover:text-indigo-300 transition duration-150">
        Read Full Post
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </Link>
    </div>
  );
};

export default PostCard;