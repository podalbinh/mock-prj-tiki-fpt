import React from "react";
import type { ReactNode } from "react";
import { LoadingProvider } from "@/contexts/LoadingProvider";
import LoadingOverlay from "@/components/wrapper/LoadingOverlay";
import { useLoading } from "@/hooks/useLoading";

interface GlobalLoadingWrapperProps {
  children: ReactNode;
}

// Component bên trong provider để có thể sử dụng useLoading hook
const LoadingOverlayWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isLoading, message } = useLoading();

  return (
    <>
      {children}
      <LoadingOverlay isVisible={isLoading} message={message} />
    </>
  );
};

// Component chính wrap cả app
export const GlobalLoadingWrapper: React.FC<GlobalLoadingWrapperProps> = ({
  children,
}) => {
  return (
    <LoadingProvider>
      <LoadingOverlayWrapper>{children}</LoadingOverlayWrapper>
    </LoadingProvider>
  );
};
