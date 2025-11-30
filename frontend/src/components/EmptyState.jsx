import PropTypes from 'prop-types';
import { FiInbox } from 'react-icons/fi';
import Button from './Button';

/**
 * EmptyState component for displaying when no data is available
 */
const EmptyState = ({
  icon,
  title = 'No data found',
  description = 'There are no items to display.',
  action,
  actionText,
  className = '',
}) => {
  const Icon = icon || FiInbox;
  
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        text-center p-8 min-h-[300px]
        ${className}
      `}
    >
      <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-[#282A3A]">
        <Icon className="w-10 h-10 text-[rgba(255,255,255,0.4)]" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">
        {title}
      </h3>
      
      <p className="text-[rgba(255,255,255,0.6)] mb-6 max-w-md">
        {description}
      </p>
      
      {action && actionText && (
        <Button onClick={action} variant="primary">
          {actionText}
        </Button>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.func,
  actionText: PropTypes.string,
  className: PropTypes.string,
};

export default EmptyState;
