import PropTypes from 'prop-types';

/**
 * Card component for displaying content in a styled container
 */
const Card = ({
  children,
  variant = 'default',
  hover = false,
  padding = 'md',
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = `
    bg-[#282A3A]
    rounded-lg
    transition-all duration-300 ease-in-out
  `;

  const variants = {
    default: '',
    elevated: 'shadow-lg shadow-black/20',
    outlined: 'border border-[rgba(255,255,255,0.1)]',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hover
    ? 'cursor-pointer hover:border-[#735F32] hover:shadow-xl hover:shadow-[#735F32]/10 hover:-translate-y-1'
    : '';

  return (
    <div
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverStyles}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'elevated', 'outlined']),
  hover: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

// Card Header subcomponent
const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Card Title subcomponent
const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-xl font-semibold text-white ${className}`}>
    {children}
  </h3>
);

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Card Description subcomponent
const CardDescription = ({ children, className = '' }) => (
  <p className={`text-[rgba(255,255,255,0.6)] text-sm mt-1 ${className}`}>
    {children}
  </p>
);

CardDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Card Content subcomponent
const CardContent = ({ children, className = '' }) => (
  <div className={`text-white ${className}`}>
    {children}
  </div>
);

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Card Footer subcomponent
const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-[rgba(255,255,255,0.1)] ${className}`}>
    {children}
  </div>
);

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
