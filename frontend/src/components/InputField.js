import React from 'react';

function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  name,
  error = '',
  className = '',
  inputClass = '',
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3 py-2 text-base border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${inputClass}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default InputField;
