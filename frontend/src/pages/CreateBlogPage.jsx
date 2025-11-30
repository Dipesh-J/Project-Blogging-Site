import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiX, FiPlus } from 'react-icons/fi';
import {
  Button,
  Input,
  Textarea,
  Card,
  Tag,
  SectionHeader,
} from '../components';
import { useCreateBlog } from '../hooks';
import { useAuthStore } from '../store';

/**
 * Create blog page component
 */
const CreateBlogPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { mutate: createBlog, isPending } = useCreateBlog();

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryInput, setSubcategoryInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      body: '',
      category: '',
      isPublished: false,
    },
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

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

  const onSubmit = (data) => {
    // Get authorId from token (decoded in backend)
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Decode JWT to get authorId (simple base64 decode)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const authorId = payload.id;

      const blogData = {
        ...data,
        authorId,
        tags: tags.length > 0 ? tags : undefined,
        subcategory: subcategories.length > 0 ? subcategories : undefined,
        isPublished: data.isPublished === 'true' || data.isPublished === true,
      };

      createBlog(blogData, {
        onSuccess: () => {
          navigate('/dashboard');
        },
      });
    } catch (error) {
      console.error('Failed to decode token:', error);
      navigate('/login');
    }
  };

  return (
    <div className="container-custom py-12 animate-fadeIn">
      <SectionHeader
        title="Create New Blog"
        subtitle="Share your thoughts with the world"
      />

      <Card variant="outlined" className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              Tags (optional)
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
              Subcategories (optional)
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
              <span className="ml-2 text-white">Publish immediately</span>
            </label>
          </div>

          {/* Submit buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t border-[rgba(255,255,255,0.1)]">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              Create Blog
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateBlogPage;
