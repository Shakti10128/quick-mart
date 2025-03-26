const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[60vh]">
      <div className="relative">
        {/* Outer Glowing Circle */}
        <div className="absolute inset-0 w-16 h-16 rounded-full animate-ping bg-gradient-to-r from-blue-500 to-purple-500 opacity-75"></div>

        {/* Inner Spinner */}
        <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
