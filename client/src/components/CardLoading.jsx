import React from 'react';

const CardLoading = () => {
  return (
    <div className="border py-2 lg:p-4 grid gap-2 lg:gap-4 min-w-36 lg:min-w-52 rounded-lg cursor-pointer bg-white animate-pulse shadow-sm">
      
      {/* Image Placeholder */}
      <div className="h-24 lg:h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md"></div>

      {/* Title Placeholder */}
      <div className="h-4 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md mx-2"></div>

      {/* Description Placeholder */}
      <div className="h-3 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md mx-2"></div>
      <div className="h-3 w-1/2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md mx-2"></div>

      {/* Price & Button Placeholder */}
      <div className="flex items-center justify-between gap-2 px-2">
        <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md"></div>
        <div className="h-6 w-16 bg-gray-300 rounded-md"></div>
      </div>

    </div>
  );
};

export default CardLoading;
