const ShimmerForPruductDtail = () => {
    return (
      <div className="max-w-4xl mx-auto p-4 md:flex md:space-x-6 animate-pulse">
        {/* Shimmer for Image */}
        <div className="md:w-1/2">
          <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
        </div>
  
        {/* Shimmer for Text */}
        <div className="md:w-1/2 space-y-4">
          <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
          <div className="w-full h-4 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
  
          {/* Shimmer for Color Selection */}
          <div className="flex space-x-2 mt-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
  
          {/* Shimmer for Size Selection */}
          <div className="flex space-x-2 mt-2">
            <div className="w-12 h-8 bg-gray-300 rounded"></div>
            <div className="w-12 h-8 bg-gray-300 rounded"></div>
            <div className="w-12 h-8 bg-gray-300 rounded"></div>
            <div className="w-12 h-8 bg-gray-300 rounded"></div>
          </div>
  
          {/* Shimmer for Button */}
          <div className="w-full h-12 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    );
  };
  
  export default ShimmerForPruductDtail;
  