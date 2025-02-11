const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative inline-flex">
        {/* Vòng xoay chính */}
        <div className="w-8 h-8 rounded-full border-2 border-indigo-200"></div>

        {/* Vòng xoay động */}
        <div className="absolute top-0 left-0 w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-[spin_0.6s_linear_infinite]"></div>

        {/* Điểm nhấn */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
