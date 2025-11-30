import PropTypes from 'prop-types';

// Spinner loader component
const SpinnerLoader = ({ size, color }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colors = {
    primary: 'border-[#735F32]',
    secondary: 'border-[#C69749]',
    white: 'border-white',
  };

  return (
    <div
      className={`
        ${sizes[size]}
        border-4 ${colors[color]} border-t-transparent
        rounded-full
        animate-spin
      `}
    />
  );
};

SpinnerLoader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white']),
};

// Dots loader component
const DotsLoader = () => (
  <div className="flex space-x-2">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-3 h-3 rounded-full bg-[#735F32] animate-pulse"
        style={{ animationDelay: `${i * 0.2}s` }}
      />
    ))}
  </div>
);

// Pulse loader component
const PulseLoader = ({ size }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`${sizes[size]} relative`}>
      <div className="absolute inset-0 rounded-full bg-[#735F32] animate-ping opacity-75" />
      <div className="relative rounded-full bg-[#735F32] w-full h-full" />
    </div>
  );
};

PulseLoader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};

/**
 * Loader component with multiple variants
 */
const Loader = ({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  text,
  fullScreen = false,
  className = '',
}) => {
  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return <DotsLoader />;
      case 'pulse':
        return <PulseLoader size={size} />;
      default:
        return <SpinnerLoader size={size} color={color} />;
    }
  };

  const content = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      {renderLoader()}
      {text && (
        <p className="text-[rgba(255,255,255,0.6)] text-sm animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

Loader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf(['spinner', 'dots', 'pulse']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white']),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
  className: PropTypes.string,
};

// Page loader for loading states
export const PageLoader = ({ text = 'Loading...' }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <Loader size="lg" text={text} />
  </div>
);

PageLoader.propTypes = {
  text: PropTypes.string,
};

// Skeleton loader for content placeholders
export const Skeleton = ({ className = '', variant = 'text' }) => {
  const variants = {
    text: 'h-4 rounded',
    title: 'h-8 rounded w-3/4',
    avatar: 'w-12 h-12 rounded-full',
    card: 'h-48 rounded-lg',
    button: 'h-10 w-24 rounded-md',
  };

  return (
    <div
      className={`
        bg-[#282A3A] animate-pulse
        ${variants[variant]}
        ${className}
      `}
    />
  );
};

Skeleton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['text', 'title', 'avatar', 'card', 'button']),
};

export default Loader;
