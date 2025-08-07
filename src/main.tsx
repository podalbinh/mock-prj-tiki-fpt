import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import 'antd/dist/reset.css'
import { GlobalLoadingWrapper } from "@/components/wrapper/GlobalLoadingWrapper";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
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
