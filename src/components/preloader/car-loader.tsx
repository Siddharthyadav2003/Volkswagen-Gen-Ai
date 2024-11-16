// src/components/preloader/car-loader.tsx
'use client';

import React from 'react';

const CarLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
      <div className="relative w-64 h-64">
        {/* Car Animation SVG */}
        <svg
          className="w-full h-full animate-bounce"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 13V16H2V13M22 13L19 8H5L2 13M22 13H2M6 16H6.01M18 16H18.01"
            stroke="#60A5FA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute bottom-0 transform -translate-x-1/2 left-1/2">
          <div className="w-32 h-1 overflow-hidden bg-gray-700 rounded-full">
            <div className="w-full h-full bg-blue-500 animate-loading-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarLoader;