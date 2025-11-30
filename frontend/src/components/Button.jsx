import PropTypes from 'prop-types';

/**
 * Button component with various variants and sizes
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-md
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#000000]
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-[#735F32] text-white
      hover:bg-[#C69749]
      focus:ring-[#735F32]
    `,
    secondary: `
      bg-[#282A3A] text-white
      border border-[#735F32]
      hover:bg-[#735F32]
      focus:ring-[#735F32]
    `,
    outline: `
      bg-transparent text-[#C69749]
      border border-[#C69749]
      hover:bg-[#C69749] hover:text-white
      focus:ring-[#C69749]
    `,
    ghost: `
      bg-transparent text-[rgba(255,255,255,0.6)]
      hover:bg-[#282A3A] hover:text-white
      focus:ring-[#282A3A]
    `,
    danger: `
      bg-[#ff4444] text-white
      hover:bg-red-600
      focus:ring-[#ff4444]
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
