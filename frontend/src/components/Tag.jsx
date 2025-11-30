import PropTypes from 'prop-types';

/**
 * Tag/Badge component for displaying labels
 */
const Tag = ({
  children,
  variant = 'default',
  size = 'md',
  removable = false,
  onRemove,
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center
    font-medium rounded-full
    transition-all duration-200 ease-out
  `;

  const variants = {
    default: 'bg-[#282A3A] text-[rgba(255,255,255,0.8)] border border-[rgba(255,255,255,0.1)]',
    primary: 'bg-[#735F32] text-white',
    secondary: 'bg-[#C69749] text-black',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-[#C69749]/20 text-[#C69749] border border-[#C69749]/30',
    error: 'bg-red-500/20 text-red-400 border border-red-500/30',
    outline: 'bg-transparent text-[#C69749] border border-[#C69749]',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1.5 hover:text-white transition-colors"
          aria-label="Remove tag"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  removable: PropTypes.bool,
  onRemove: PropTypes.func,
  className: PropTypes.string,
};

export default Tag;
