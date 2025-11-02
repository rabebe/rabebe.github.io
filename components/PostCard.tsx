// components/PostCard.tsx

import React from 'react';
import Link from 'next/link';
import { Post } from '@/lib/api';

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

  return (
    <div className="bg-white p-6 shadow-xl rounded-xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
      
      {/* Date and Metadata */}
      <p className="text-sm font-medium text-indigo-600 mb-2">
        Posted on {formatDate(post.created_at)}
      </p>

      {/* Post Title - Link to full post */}
      <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">
        <Link href={postUrl} className="hover:text-indigo-700 transition duration-150">
          {post.title}
        </Link>
      </h2>

      {/* Snippet of the Post Body */}
      <p className="text-gray-600 mb-4 line-clamp-3">
        {/* We strip down the body text to a max length for the preview */}
        {post.body.substring(0, 150)}...
      </p>

      {/* Read More Link */}
      <Link href={postUrl} className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition duration-150">
        Read Full Post
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </Link>
    </div>
  );
};

export default PostCard;