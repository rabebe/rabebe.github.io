/**
 * Interface (Type Definition) for a Blog Post.
 * Note: These fields should match the JSON output structure from your Rails /posts endpoint.
 */
export interface Post {
  id: number;
  title: string;
  body: string;
  user_id: number;
  published_at: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 

if (!BASE_URL) {
  console.warn("NEXT_PUBLIC_API_BASE_URL is not set. Defaulting to http://localhost:3000/posts");
}

const API_ENDPOINT = BASE_URL || 'http://localhost:3000/posts';

/**
 * A reusable fetcher utility to handle the API request.
 * @param url The endpoint URL to fetch.
 */
async function fetcher<T>(url: string): Promise<T> {
  // Use 'no-store' cache to ensure we always hit the API for fresh content.
  const response = await fetch(url, { next: { revalidate: 3600 } }); 
  
  if (!response.ok) {
    // Throw error with more detail for better debugging
    const errorBody = await response.text();
    throw new Error(`API call failed for ${url}: ${response.status} ${response.statusText}. Body: ${errorBody}`);
  }
  
  // Cast the JSON response to the expected type T (e.g., Post or Post[])
  return response.json() as Promise<T>;
}

/**
 * Fetches all published blog posts from the Rails API.
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    const posts = await fetcher<Post[]>(API_ENDPOINT);
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
    const url = `${API_ENDPOINT}/${id}`;
    const post = await fetcher<Post>(url); 
    return post;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    return null;
  }
}