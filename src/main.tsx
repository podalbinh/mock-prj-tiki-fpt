import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GlobalLoadingWrapper } from "@/components/wrapper/GlobalLoadingWrapper";
import { ModalProvider } from "@/contexts/ModalProvider";
import { RouterProvider } from "react-router-dom";
import router from "./config/routes.tsx";
import { Provider } from "react-redux";
import { store } from "@/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalLoadingWrapper>
      <ModalProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ModalProvider>
    </GlobalLoadingWrapper>
  </StrictMode>
);
