import { getPostById, getAllPosts } from '../../../lib/api'; // NOTE: Added getAllPosts import
import { notFound } from 'next/navigation'; // For handling 404/not found cases

// Define the Post interface locally for type safety, ensuring it matches your Rails model
interface Post {
  id: number;
  title: string;
  body: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  // FIX: Replaced 'any | null' with 'string | null' to satisfy the linter's
  // 'Unexpected any' rule. We assume the author field, if populated, will be a string.
  author: string | null; 
}

// FIX: Define a dedicated interface for the component props to enforce type clarity
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
  // Fetch all posts and explicitly cast the result to our locally defined Post[] type.
  // This resolves the conflict with the external definition in '../../../lib/api'.
  const posts = await getAllPosts() as Post[];

  // Map the post array to the format required by Next.js: { id: string }
  return posts.map((post) => ({
    // The ID must be returned as a string
    id: post.id.toString(), 
  }));
}


/**
 * The individual Blog Post page component.
 * Fetches post data server-side using the ID from the URL.
 */
// FIX: Using the dedicated PostPageProps interface defined above.
const PostPage = async ({ params }: PostPageProps) => {
  // FINAL FIX: We explicitly await the params object before destructuring,
  // which is the official ultimate fix from the Next.js documentation for
  // when the router aggressively marks params as a Promise.
  const { id } = await params; 
  const postId = parseInt(id);

  if (isNaN(postId)) {
    // If the ID is not a number, show the Next.js notFound page
    notFound(); 
  }

  // 1. Fetch the single post from the Rails API
  // We explicitly cast the result to ensure type safety in this file.
  let post: Post | null = null;
  try {
    const fetchedPost = await getPostById(postId);
    post = fetchedPost as Post;
  } catch (error) {
    console.error(`Error fetching post ${postId}:`, error);
    // If API call fails (e.g., 404 response), trigger notFound
    notFound();
  }

  // Double-check if the post exists
  if (!post) {
    notFound();
  }
  
  // Format the date for display
  const dateToDisplay = post.published_at || post.created_at;
  const formattedDate = dateToDisplay
    ? new Date(dateToDisplay).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date Unavailable';

  return (
    <main className="min-h-screen bg-gray-50 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Post Header */}
        <header className="mb-10 border-b border-gray-300 pb-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-gray-500">
            Published on <time dateTime={dateToDisplay || ''}>{formattedDate}</time>
            {/* You could add the author's name here if post.author were not null */}
          </p>
        </header>

        {/* Post Body - Using basic markdown styling via Tailwind utility classes */}
        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p>{post.body}</p>
          {/* NOTE: If your Rails body contained HTML/Markdown, you would use dangerouslySetInnerHTML here.
             For now, we treat it as plain text. */}
        </article>
        
        {/* Back Link */}
        <div className="mt-12 pt-6 border-t border-gray-200">
            <a href="/blog" className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-150 flex items-center">
                &larr; Back to all posts
            </a>
        </div>

      </div>
    </main>
  );
};

export default PostPage;
