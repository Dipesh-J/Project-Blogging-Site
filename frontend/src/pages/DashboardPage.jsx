import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus, FiEye, FiClock } from 'react-icons/fi';
import {
  Button,
  Card,
  Tag,
  PageLoader,
  APIError,
  EmptyState,
  SectionHeader,
  ConfirmModal,
} from '../components';
import { useBlogs, useDeleteBlog } from '../hooks';
import { useAuthStore } from '../store';

/**
 * Dashboard page for managing user's blogs
 */
const DashboardPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const { data: blogs, isLoading, isError, refetch } = useBlogs();
  const { mutate: deleteBlog, isPending: isDeleting } = useDeleteBlog();

  // Get current user's authorId from token
  const getCurrentAuthorId = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch {
      return null;
    }
  };

  const authorId = getCurrentAuthorId();

  // Filter blogs by current user
  const myBlogs = blogs?.filter((blog) => blog.authorId === authorId) || [];

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (blogToDelete) {
      deleteBlog(blogToDelete._id, {
        onSuccess: () => {
          setDeleteModalOpen(false);
          setBlogToDelete(null);
        },
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Draft';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return <PageLoader text="Loading your blogs..." />;
  }

  if (isError) {
    return (
      <div className="container-custom py-12">
        <APIError
          title="Failed to load blogs"
          message="There was an error loading your blogs. Please try again."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="container-custom py-12 animate-fadeIn">
      <SectionHeader
        title="Dashboard"
        subtitle="Manage your blogs and content"
        action={
          <Link to="/blogs/create">
            <Button>
              <FiPlus className="mr-2" />
              New Blog
            </Button>
          </Link>
        }
      />

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card variant="outlined">
          <div className="text-center">
            <p className="text-3xl font-semibold text-[#C69749] mb-2">
              {myBlogs.length}
            </p>
            <p className="text-[rgba(255,255,255,0.6)]">Total Blogs</p>
          </div>
        </Card>
        <Card variant="outlined">
          <div className="text-center">
            <p className="text-3xl font-semibold text-green-400 mb-2">
              {myBlogs.filter((b) => b.isPublished).length}
            </p>
            <p className="text-[rgba(255,255,255,0.6)]">Published</p>
          </div>
        </Card>
        <Card variant="outlined">
          <div className="text-center">
            <p className="text-3xl font-semibold text-yellow-400 mb-2">
              {myBlogs.filter((b) => !b.isPublished).length}
            </p>
            <p className="text-[rgba(255,255,255,0.6)]">Drafts</p>
          </div>
        </Card>
      </div>

      {/* Blog list */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Your Blogs</h3>

        {myBlogs.length > 0 ? (
          <div className="space-y-4">
            {myBlogs.map((blog) => (
              <Card
                key={blog._id}
                variant="outlined"
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag variant="primary" size="sm">
                      {blog.category}
                    </Tag>
                    {blog.isPublished ? (
                      <Tag variant="success" size="sm">
                        Published
                      </Tag>
                    ) : (
                      <Tag variant="warning" size="sm">
                        Draft
                      </Tag>
                    )}
                  </div>
                  <h4 className="text-lg font-medium text-white mb-1">
                    {blog.title}
                  </h4>
                  <p className="text-sm text-[rgba(255,255,255,0.6)] line-clamp-1">
                    {blog.body}
                  </p>
                  <div className="flex items-center text-xs text-[rgba(255,255,255,0.4)] mt-2">
                    <FiClock className="mr-1" />
                    {formatDate(blog.publishedAt || blog.createdAt)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link to={`/blogs/${blog._id}`}>
                    <Button variant="ghost" size="sm">
                      <FiEye className="mr-1" />
                      View
                    </Button>
                  </Link>
                  <Link to={`/blogs/${blog._id}/edit`}>
                    <Button variant="outline" size="sm">
                      <FiEdit className="mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClick(blog)}
                  >
                    <FiTrash2 className="mr-1" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No blogs yet"
            description="You haven't created any blogs yet. Start writing your first blog post!"
            action={() => navigate('/blogs/create')}
            actionText="Create Your First Blog"
          />
        )}
      </div>

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setBlogToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Blog"
        message={`Are you sure you want to delete "${blogToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={isDeleting}
      />
    </div>
  );
};

export default DashboardPage;
