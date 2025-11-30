import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import {
  Button,
  Input,
  Textarea,
  Card,
  Tag,
  PageLoader,
  APIError,
  SectionHeader,
} from '../components';
import { useBlog, useUpdateBlog } from '../hooks';
import { useAuthStore } from '../store';

/**
 * Inner form component that receives blog data as props to avoid useEffect issues
 */
const EditBlogForm = ({ blog, onSubmit, isPending, onCancel }) => {
  const [tags, setTags] = useState(blog?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [subcategories, setSubcategories] = useState(blog?.subcategory || []);
  const [subcategoryInput, setSubcategoryInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: blog?.title || '',
      body: blog?.body || '',
      category: blog?.category || '',
      isPublished: blog?.isPublished || false,
    },
  });

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddSubcategory = () => {
    if (subcategoryInput.trim() && !subcategories.includes(subcategoryInput.trim())) {
      setSubcategories([...subcategories, subcategoryInput.trim()]);
      setSubcategoryInput('');
    }
  };

  const handleRemoveSubcategory = (subToRemove) => {
    setSubcategories(subcategories.filter((sub) => sub !== subToRemove));
  };

  const handleFormSubmit = (data) => {
    // Only include tags and subcategories if they differ from original
    const newTags = tags.filter(t => !blog.tags?.includes(t));
    const newSubcategories = subcategories.filter(s => !blog.subcategory?.includes(s));

    const updateData = {
      title: data.title,
      body: data.body,
      category: data.category,
      isPublished: data.isPublished === true || data.isPublished === 'true',
    };

    // Only add new tags (API uses $push)
    if (newTags.length > 0) {
      updateData.tags = newTags;
    }
    if (newSubcategories.length > 0) {
      updateData.subcategory = newSubcategories;
    }

    onSubmit(updateData);
  };

  return (
    <Card variant="outlined" className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Title */}
        <Input
          label="Blog Title"
          placeholder="Enter a compelling title"
          required
          error={errors.title?.message}
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters',
            },
          })}
        />

        {/* Category */}
        <Input
          label="Category"
          placeholder="e.g., Technology, Travel, Food"
          required
          error={errors.category?.message}
          {...register('category', {
            required: 'Category is required',
          })}
        />

        {/* Body */}
        <Textarea
          label="Content"
          placeholder="Write your blog content here..."
          rows={10}
          required
          error={errors.body?.message}
          {...register('body', {
            required: 'Content is required',
            minLength: {
              value: 10,
              message: 'Content must be at least 10 characters',
            },
          })}
        />

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button type="button" variant="secondary" onClick={handleAddTag}>
              <FiPlus />
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag} variant="primary" removable onRemove={() => handleRemoveTag(tag)}>
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>

        {/* Subcategories */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Subcategories
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add a subcategory"
              value={subcategoryInput}
              onChange={(e) => setSubcategoryInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSubcategory();
                }
              }}
            />
            <Button type="button" variant="secondary" onClick={handleAddSubcategory}>
              <FiPlus />
            </Button>
          </div>
          {subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {subcategories.map((sub) => (
                <Tag key={sub} variant="secondary" removable onRemove={() => handleRemoveSubcategory(sub)}>
                  {sub}
                </Tag>
              ))}
            </div>
          )}
        </div>

        {/* Publish status */}
        <div className="flex items-center gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-[rgba(255,255,255,0.2)] bg-[#282A3A] text-[#735F32] focus:ring-[#735F32]"
              {...register('isPublished')}
            />
            <span className="ml-2 text-white">Published</span>
          </label>
        </div>

        {/* Submit buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t border-[rgba(255,255,255,0.1)]">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" loading={isPending}>
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
};

/**
 * Edit blog page component
 */
const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const { data: blog, isLoading, isError, refetch } = useBlog(id);
  const { mutate: updateBlog, isPending } = useUpdateBlog();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleSubmit = (updateData) => {
    updateBlog(
      { id, data: updateData },
      {
        onSuccess: () => {
          navigate(`/blogs/${id}`);
        },
      }
    );
  };

  const handleCancel = () => {
    navigate(`/blogs/${id}`);
  };

  if (isLoading) {
    return <PageLoader text="Loading blog..." />;
  }

  if (isError || !blog) {
    return (
      <div className="container-custom py-12">
        <APIError
          title="Blog not found"
          message="The blog you're trying to edit doesn't exist."
          onRetry={refetch}
        />
        <div className="text-center mt-6">
          <Link to="/dashboard">
            <Button variant="outline">
              <FiArrowLeft className="mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12 animate-fadeIn">
      {/* Back button */}
      <div className="mb-6">
        <Link to={`/blogs/${id}`}>
          <Button variant="ghost" size="sm">
            <FiArrowLeft className="mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      <SectionHeader
        title="Edit Blog"
        subtitle="Update your blog post"
      />

      <EditBlogForm
        blog={blog}
        onSubmit={handleSubmit}
        isPending={isPending}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditBlogPage;
