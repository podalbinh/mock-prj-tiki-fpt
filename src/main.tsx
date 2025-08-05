import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GlobalLoadingWrapper } from "@/components/wrapper/GlobalLoadingWrapper";
import { RouterProvider } from "react-router-dom";
import router from "./config/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalLoadingWrapper>
      <RouterProvider router={router} />
    </GlobalLoadingWrapper>
  </StrictMode>
);
