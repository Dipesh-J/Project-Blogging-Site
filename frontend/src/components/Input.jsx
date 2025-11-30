import PropTypes from 'prop-types';
import { forwardRef, useId } from 'react';

/**
 * Input component with label and error support
 */
const Input = forwardRef(({
  label,
  type = 'text',
  error,
  helperText,
  fullWidth = true,
  required = false,
  className = '',
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = props.id || props.name || generatedId;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-white mb-2"
        >
          {label}
          {required && <span className="text-[#ff4444] ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        className={`
          w-full px-4 py-3
          bg-[#282A3A] text-white
          border rounded-md
          placeholder-[rgba(255,255,255,0.4)]
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-[#735F32] focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error 
            ? 'border-[#ff4444] focus:ring-[#ff4444]' 
            : 'border-[rgba(255,255,255,0.1)] hover:border-[#735F32]'
          }
        `}
        {...props}
      />
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-[#ff4444]' : 'text-[rgba(255,255,255,0.6)]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
