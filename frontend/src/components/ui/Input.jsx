import React from 'react';

export function Input({ 
  label,
  error,
  className = '',
  ...props 
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

export function Select({ 
  label,
  error,
  children,
  className = '',
  ...props 
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
          ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

export function FileInput({ 
  label,
  error,
  onChange,
  accept,
  className = '',
  ...props 
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
          file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
          file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200
          ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
