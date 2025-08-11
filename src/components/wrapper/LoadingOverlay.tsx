import React from "react";
import { createPortal } from "react-dom";
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

  return createPortal(
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="p-6 flex flex-col items-center space-y-4 max-w-xs w-full mx-4">
        <div className="loader"></div>
        <p className="text-white text-center font-medium text-lg">{message}...</p>
      </div>
    </div>,
    document.body
  );
};

export default LoadingOverlay;
