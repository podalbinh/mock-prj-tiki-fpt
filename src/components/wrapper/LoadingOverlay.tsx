import React from "react";
import "@/styles/Loading.css";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = "Đang tải",
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="p-6 flex flex-col items-center space-y-4 max-w-xs w-full mx-4">
        {/* Spinner */}
        <div className="loader"></div>

        {/* Loading message */}
        <p className="text-white text-center font-medium text-lg">{message}...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
