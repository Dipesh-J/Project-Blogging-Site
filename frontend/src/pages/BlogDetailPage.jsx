import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiTrash2, FiClock, FiUser, FiTag } from 'react-icons/fi';
import {
  Button,
  Tag,
  PageLoader,
  APIError,
  Card,
  ConfirmModal,
} from '../components';
import { useBlog, useDeleteBlog } from '../hooks';
import { useAuthStore } from '../store';

/**
 * Blog detail page component
 */
const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: blog, isLoading, isError, refetch } = useBlog(id);
  const { mutate: deleteBlog, isPending: isDeleting } = useDeleteBlog();

  const handleDelete = () => {
    deleteBlog(id, {
      onSuccess: () => {
        navigate('/blogs');
      },
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return <PageLoader text="Loading blog..." />;
  }

  if (isError || !blog) {
    return (
      <div className="container-custom py-12">
        <APIError
          title="Blog not found"
          message="The blog you're looking for doesn't exist or has been deleted."
          onRetry={refetch}
        />
        <div className="text-center mt-6">
          <Link to="/blogs">
            <Button variant="outline">
              <FiArrowLeft className="mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12 animate-fadeIn">
      {/* Back button */}
      <div className="mb-8">
        <Link to="/blogs">
          <Button variant="ghost" size="sm">
            <FiArrowLeft className="mr-2" />
            Back to Blogs
          </Button>
        </Link>
      </div>

      {/* Blog header */}
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          {/* Category and status */}
          <div className="flex items-center gap-3 mb-4">
            <Tag variant="primary">{blog.category}</Tag>
            {blog.isPublished ? (
              <Tag variant="success">Published</Tag>
            ) : (
              <Tag variant="warning">Draft</Tag>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-[rgba(255,255,255,0.6)]">
            <div className="flex items-center">
              <FiClock className="mr-2" />
              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
            </div>
            {blog.authorId && (
              <div className="flex items-center">
                <FiUser className="mr-2" />
                <span>Author</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <FiTag className="text-[rgba(255,255,255,0.4)]" />
              {blog.tags.map((tag, index) => (
                <Tag key={index} variant="default" size="sm">
                  {tag}
                </Tag>
              ))}
            </div>
          )}

          {/* Subcategories */}
          {blog.subcategory && blog.subcategory.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {blog.subcategory.map((sub, index) => (
                <Tag key={index} variant="outline" size="sm">
                  {sub}
                </Tag>
              ))}
            </div>
          )}
        </header>

        {/* Blog content */}
        <Card variant="outlined" padding="lg" className="mb-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-white/90 whitespace-pre-wrap leading-relaxed text-lg">
              {blog.body}
            </p>
          </div>
        </Card>

        {/* Action buttons for authenticated users */}
        {isAuthenticated && (
          <div className="flex items-center gap-4 justify-end">
            <Link to={`/blogs/${blog._id}/edit`}>
              <Button variant="outline">
                <FiEdit2 className="mr-2" />
                Edit Blog
              </Button>
            </Link>
            <Button
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
            >
              <FiTrash2 className="mr-2" />
              Delete
            </Button>
          </div>
        )}
      </article>

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
        confirmText="Delete"
        loading={isDeleting}
      />
    </div>
  );
};

export default BlogDetailPage;
