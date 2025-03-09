import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({
  value,
  onChange,
  placeholder,
  name,
  error,
  id,
  required = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          name={name}
          required={required}
          className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          tabIndex="-1"
          className={`absolute inset-y-0 right-0 pr-3 flex items-center z-20 text-gray-400 hover:text-gray-500 transition-opacity ${
            value ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? (
            <FaEyeSlash className="h-4 w-4" />
          ) : (
            <FaEye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordInput;
