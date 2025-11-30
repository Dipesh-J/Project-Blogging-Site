import PropTypes from 'prop-types';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import Button from './Button';

/**
 * APIError component for displaying API errors
 */
const APIError = ({
  title = 'Something went wrong',
  message = 'An error occurred while fetching data. Please try again.',
  onRetry,
  showRetry = true,
  className = '',
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        text-center p-8
        ${className}
      `}
    >
      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#ff4444]/10">
        <FiAlertTriangle className="w-8 h-8 text-[#ff4444]" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">
        {title}
      </h3>
      
      <p className="text-[rgba(255,255,255,0.6)] mb-6 max-w-md">
        {message}
      </p>
      
      {showRetry && onRetry && (
        <Button onClick={onRetry} variant="outline">
          <FiRefreshCw className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

APIError.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
  showRetry: PropTypes.bool,
  className: PropTypes.string,
};

export default APIError;
