import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import "antd/dist/reset.css";
import { GlobalLoadingWrapper } from "@/components/wrapper/GlobalLoadingWrapper";
import { ModalProvider } from "@/contexts/ModalProvider";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { store } from "@/store";
import { App } from "antd";
import "./main.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalLoadingWrapper>
      <ModalProvider>
        <Provider store={store}>
          <App>
            <RouterProvider router={router} />
          </App>
        </Provider>
      </ModalProvider>
    </GlobalLoadingWrapper>
  </StrictMode>
);
