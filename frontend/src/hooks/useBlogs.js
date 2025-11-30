import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogsAPI } from '../services/api';
import toast from 'react-hot-toast';

/**
 * Hook for fetching all blogs with optional filters
 */
export const useBlogs = (filters = {}) => {
  return useQuery({
    queryKey: ['blogs', filters],
    queryFn: () => blogsAPI.getAll(filters),
    select: (data) => data.data,
  });
};

/**
 * Hook for fetching a single blog by ID
 */
export const useBlog = (id) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogsAPI.getById(id),
    enabled: !!id,
    select: (data) => {
      // The API returns an array, get the first item
      const blogs = data.data;
      return Array.isArray(blogs) ? blogs[0] : blogs;
    },
  });
};

/**
 * Hook for creating a new blog
 */
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog created successfully!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || error.response?.data?.msg || 'Failed to create blog';
      toast.error(message);
    },
  });
};

/**
 * Hook for updating a blog
 */
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => blogsAPI.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blog', variables.id] });
      toast.success('Blog updated successfully!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || error.response?.data?.msg || 'Failed to update blog';
      toast.error(message);
    },
  });
};

/**
 * Hook for deleting a blog
 */
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogsAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog deleted successfully!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || error.response?.data?.msg || 'Failed to delete blog';
      toast.error(message);
    },
  });
};
