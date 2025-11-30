import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter, FiClock, FiTag, FiX } from 'react-icons/fi';
import {
  Button,
  Card,
  Tag,
  Input,
  PageLoader,
  APIError,
  EmptyState,
  SectionHeader,
} from '../components';
import { useBlogs } from '../hooks';

/**
 * Blog list page component
 */
const BlogListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get filters from URL params
  const filters = useMemo(() => {
    const category = searchParams.get('category') || '';
    const tags = searchParams.get('tags') || '';
    return { category, tags };
  }, [searchParams]);

  const { data: blogs, isLoading, isError, refetch } = useBlogs(filters);

  // Filter blogs by search term (client-side)
  const filteredBlogs = useMemo(() => {
    if (!blogs || !searchTerm) return blogs;
    const term = searchTerm.toLowerCase();
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(term) ||
        blog.body.toLowerCase().includes(term) ||
        blog.category.toLowerCase().includes(term)
    );
  }, [blogs, searchTerm]);

  // Get unique categories and tags from blogs
  const { categories, allTags } = useMemo(() => {
    if (!blogs) return { categories: [], allTags: [] };
    const cats = [...new Set(blogs.map((b) => b.category))];
    const tags = [...new Set(blogs.flatMap((b) => b.tags || []))];
    return { categories: cats, allTags: tags };
  }, [blogs]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchTerm('');
  };

  const hasActiveFilters = filters.category || filters.tags || searchTerm;

  if (isLoading) {
    return <PageLoader text="Loading blogs..." />;
  }

  if (isError) {
    return (
      <div className="container-custom py-12">
        <APIError
          title="Failed to load blogs"
          message="There was an error loading the blogs. Please try again."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="container-custom py-12 animate-fadeIn">
      <SectionHeader
        title="Explore Blogs"
        subtitle="Discover amazing stories from our community"
        action={
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter className="mr-2" />
            Filters
          </Button>
        }
      />

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search bar */}
        <div className="relative max-w-md">
          <Input
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.4)]" />
        </div>

        {/* Filter panel */}
        {showFilters && (
          <Card variant="outlined" className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Tag
                      key={cat}
                      variant={filters.category === cat ? 'primary' : 'default'}
                      className="cursor-pointer"
                      onClick={() =>
                        handleFilterChange(
                          'category',
                          filters.category === cat ? '' : cat
                        )
                      }
                    >
                      {cat}
                    </Tag>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 10).map((tag) => (
                    <Tag
                      key={tag}
                      variant={filters.tags === tag ? 'secondary' : 'default'}
                      className="cursor-pointer"
                      onClick={() =>
                        handleFilterChange('tags', filters.tags === tag ? '' : tag)
                      }
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Active filters */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-[rgba(255,255,255,0.6)]">
              Active filters:
            </span>
            {searchTerm && (
              <Tag
                variant="outline"
                removable
                onRemove={() => setSearchTerm('')}
              >
                Search: {searchTerm}
              </Tag>
            )}
            {filters.category && (
              <Tag
                variant="primary"
                removable
                onRemove={() => handleFilterChange('category', '')}
              >
                {filters.category}
              </Tag>
            )}
            {filters.tags && (
              <Tag
                variant="secondary"
                removable
                onRemove={() => handleFilterChange('tags', '')}
              >
                {filters.tags}
              </Tag>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <FiX className="mr-1" />
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Blog grid */}
      {filteredBlogs && filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FiTag}
          title="No blogs found"
          description={
            hasActiveFilters
              ? 'No blogs match your current filters. Try adjusting your search.'
              : 'There are no published blogs yet. Be the first to write one!'
          }
          action={hasActiveFilters ? clearFilters : undefined}
          actionText={hasActiveFilters ? 'Clear filters' : undefined}
        />
      )}
    </div>
  );
};

// Blog Card Component
const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Draft';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link to={`/blogs/${blog._id}`}>
      <Card variant="outlined" hover className="h-full flex flex-col">
        <Card.Header>
          <div className="flex items-center gap-2 mb-2">
            <Tag variant="primary" size="sm">
              {blog.category}
            </Tag>
            {blog.isPublished && (
              <Tag variant="success" size="sm">
                Published
              </Tag>
            )}
          </div>
          <Card.Title className="line-clamp-2">{blog.title}</Card.Title>
        </Card.Header>

        <Card.Content className="flex-1">
          <p className="text-[rgba(255,255,255,0.6)] line-clamp-3">
            {blog.body}
          </p>
        </Card.Content>

        <Card.Footer className="flex items-center justify-between">
          <div className="flex items-center text-sm text-[rgba(255,255,255,0.6)]">
            <FiClock className="mr-1" />
            {formatDate(blog.publishedAt || blog.createdAt)}
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex items-center gap-1">
              <FiTag className="text-[rgba(255,255,255,0.4)]" />
              <span className="text-sm text-[rgba(255,255,255,0.6)]">
                {blog.tags.length}
              </span>
            </div>
          )}
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogListPage;
