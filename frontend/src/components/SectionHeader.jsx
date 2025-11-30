import PropTypes from 'prop-types';

/**
 * SectionHeader component for page sections
 */
const SectionHeader = ({
  title,
  subtitle,
  align = 'left',
  action,
  className = '',
}) => {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div
      className={`
        flex flex-col md:flex-row md:items-center md:justify-between
        mb-8
        ${alignments[align]}
        ${className}
      `}
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-[rgba(255,255,255,0.6)]">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="mt-4 md:mt-0">
          {action}
        </div>
      )}
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  action: PropTypes.node,
  className: PropTypes.string,
};

export default SectionHeader;
