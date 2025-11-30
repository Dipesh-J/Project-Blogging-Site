import PropTypes from 'prop-types';
import { forwardRef, useId } from 'react';

/**
 * Select dropdown component with label and error support
 */
const Select = forwardRef(({
  label,
  options = [],
  error,
  helperText,
  fullWidth = true,
  required = false,
  placeholder = 'Select an option',
  className = '',
  ...props
}, ref) => {
  const generatedId = useId();
  const selectId = props.id || props.name || generatedId;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-white mb-2"
        >
          {label}
          {required && <span className="text-[#ff4444] ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={`
          w-full px-4 py-3
          bg-[#282A3A] text-white
          border rounded-md
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-[#735F32] focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          appearance-none
          cursor-pointer
          ${error 
            ? 'border-[#ff4444] focus:ring-[#ff4444]' 
            : 'border-[rgba(255,255,255,0.1)] hover:border-[#735F32]'
          }
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          backgroundSize: '20px',
        }}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="bg-[#282A3A] text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-[#ff4444]' : 'text-[rgba(255,255,255,0.6)]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  error: PropTypes.string,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default Select;
