import { getPostById, getAllPosts } from '../../../lib/api'; 
import { notFound } from 'next/navigation';
import Link from 'next/link';
// IMPORT FIX: Import the new FormattedContent component
// Adjust the relative path below based on where you save FormattedContent.tsx
import FormattedContent from '@/components/FormattedContent';


// Define the Post interface locally for type safety, ensuring it matches your Rails model
interface Post {
  id: number;
  title: string;
  body: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  author: string | null; 
}

// Define a dedicated interface for the component props to enforce type clarity
interface PostPageProps {
  params: {
    id: string;
  };
}


/**
 * REQUIRED for 'output: export' on dynamic routes.
 * This function tells Next.js which pages to pre-render at build time.
 */
export async function generateStaticParams() {
  const posts = await getAllPosts() as Post[];

  return posts.map((post) => ({
    id: post.id.toString(), 
  }));
}


/**
 * The individual Blog Post page component.
 * Fetches post data server-side using the ID from the URL.
 */
const PostPage = async ({ params }: PostPageProps) => {
  const { id } = await params; 
  const postId = parseInt(id);

  if (isNaN(postId)) {
    notFound(); 
  }

  let post: Post | null = null;
  try {
    const fetchedPost = await getPostById(postId);
    post = fetchedPost as Post;
  } catch (error) {
    console.error(`Error fetching post ${postId}:`, error);
    notFound();
  }

  if (!post) {
    notFound();
  }
  
  const dateToDisplay = post.published_at || post.created_at;
  const formattedDate = dateToDisplay
    ? new Date(dateToDisplay).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date Unavailable';

  return (
    <main className="min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Post Header */}
        <header className="mb-10 pb-6 ">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight text-white">
            {post.title}
          </h1>
          <p className="text-lg text-indigo-400">
            Published on <time dateTime={dateToDisplay || ''}>{formattedDate}</time>
          </p>
        </header>

        {/* Post Body - Renders Markdown using the new component */}
        <article className="prose prose-lg max-w-none leading-relaxed prose-invert text-white prose-headings:text-white">
          {/* CRITICAL CHANGE: ACTIVATE DEBUG MODE */}
          <FormattedContent content={post.body} isDebug={false} /> 
        </article>
        
        {/* Back Link */}
        <div className="mt-12 pt-6">
            <Link href="/blog" className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-150 flex items-center">
                &larr; Back to all posts
            </Link>
        </div>

      </div>
    </main>
  );
};

export default PostPage;