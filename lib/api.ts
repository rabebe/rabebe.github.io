// lib/api.ts

/**
 * Interface (Type Definition) for a Blog Post.
 * Note: These fields should match the JSON output structure from your Rails /posts endpoint.
 */
export interface Post {
  id: number;
  title: string;
  body: string;
  user_id: number;     // Corresponds to the User who authored the post
  created_at: string;  // ISO Date string
  updated_at: string;  // ISO Date string
}

// !!! IMPORTANT: This is the URL for your Rails API !!!
// For local development, it assumes your Rails server is running on port 3000.
// You MUST update this when you deploy your Rails API.
const BASE_URL = 'http://localhost:3000/posts'; 

/**
 * A reusable fetcher utility to handle the API request.
 * @param url The endpoint URL to fetch.
 */
async function fetcher<T>(url: string): Promise<T> {
  // Use 'no-store' cache to ensure we always hit the API for fresh content.
  const response = await fetch(url, { cache: 'no-store' }); 
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText} (${response.status})`);
  }
  
  // Cast the JSON response to the expected type T (e.g., Post or Post[])
  return response.json() as Promise<T>;
}

/**
 * Fetches all published blog posts from the Rails API.
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    const posts = await fetcher<Post[]>(BASE_URL);
    return posts;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    // Return an empty array on failure to prevent the app from crashing
    return [];
  }
}

/**
 * Fetches a single post by its ID (which we will use as the slug in the URL).
 */
export async function getPostById(id: number): Promise<Post | null> {
  try {
    const url = `${BASE_URL}/${id}`;
    const post = await fetcher<Post>(url); 
    return post;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    return null;
  }
}