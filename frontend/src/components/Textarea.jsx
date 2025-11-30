import PropTypes from 'prop-types';
import { forwardRef, useId } from 'react';

/**
 * Textarea component with label and error support
 */
const Textarea = forwardRef(({
  label,
  error,
  helperText,
  fullWidth = true,
  required = false,
  rows = 4,
  className = '',
  ...props
}, ref) => {
  const generatedId = useId();
  const textareaId = props.id || props.name || generatedId;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-white mb-2"
        >
          {label}
          {required && <span className="text-[#ff4444] ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={`
          w-full px-4 py-3
          bg-[#282A3A] text-white
          border rounded-md
          placeholder-[rgba(255,255,255,0.4)]
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-[#735F32] focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          resize-y min-h-[100px]
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

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  rows: PropTypes.number,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default Textarea;
