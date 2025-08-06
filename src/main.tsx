import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GlobalLoadingWrapper } from "@/components/wrapper/GlobalLoadingWrapper";
import { RouterProvider } from "react-router-dom";
import router from "./config/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalLoadingWrapper>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GlobalLoadingWrapper>
  </StrictMode>
);
