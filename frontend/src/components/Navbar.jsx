import React from 'react';
import { Link } from 'react-router-dom';

const BlogHeader = () => {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 py-4 mb-8">
      <div className="container mx-auto px-4 flex items-center justify-between sm:justify-start sm:space-x-6">
        <Link to="/" className="text-3xl font-bold hover:text-gray-700 dark:hover:text-gray-300">
          Minimalist Blog
        </Link>
        <div className="flex items-center space-x-4 ml-auto">
          <Link to="/new">
            <button 
              className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white py-2 px-4 rounded-lg flex items-center">
              <svg 
                className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-300" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 5v14M5 12h14" />
              </svg>
              New Post
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
