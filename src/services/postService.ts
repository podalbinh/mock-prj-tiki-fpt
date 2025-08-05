import Request from '@/config/api';
import type { ApiResponse } from '@/config/api';

// Types cho Post API
interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

interface CreatePostData {
  title: string;
  content: string;
}

interface UpdatePostData {
  title?: string;
  content?: string;
}

// Post API functions - sử dụng Request class
export const postApi = {
  // GET methods
  getAllPosts: () => Request.get<Post[]>('/posts'),
  getPostById: (id: string) => Request.get<Post>(`/posts/${id}`),
  getPostsByAuthor: (authorId: string) => Request.get<Post[]>(`/posts/author/${authorId}`),
  
  // POST methods
  createPost: (data: CreatePostData) => Request.post<Post>('/posts', data),
  
  // PUT methods
  updatePost: (id: string, data: UpdatePostData) => Request.put<Post>(`/posts/${id}`, data),
  
  // PATCH methods (partial update)
  patchPost: (id: string, data: Partial<Post>) => Request.patch<Post>(`/posts/${id}`, data),
  
  // DELETE methods
  deletePost: (id: string) => Request.delete<void>(`/posts/${id}`),
  
  // Custom endpoints
  publishPost: (id: string) => Request.patch<Post>(`/posts/${id}/publish`, {}),
  unpublishPost: (id: string) => Request.patch<Post>(`/posts/${id}/unpublish`, {}),
};

// Export types
export type { Post, CreatePostData, UpdatePostData, ApiResponse };
