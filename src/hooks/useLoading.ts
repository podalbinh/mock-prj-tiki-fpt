import { useContext } from "react";
import { LoadingContext } from "@/contexts/LoadingContext";
import type { LoadingContextType } from "@/contexts/LoadingContext";

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
