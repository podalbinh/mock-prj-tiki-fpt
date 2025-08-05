import { lazy, Suspense, type JSX } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingOverlay from "@/components/wrapper/LoadingOverlay";

// Lazy load pages
const LoginPage = lazy(() => import("@/pages/Login"));
// const HomePage = lazy(() => import("@/pages/App"));

const withSuspense = (
  Component: React.LazyExoticComponent<() => JSX.Element>
) => (
  <Suspense fallback={<LoadingOverlay isVisible />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: withSuspense(HomePage),
  // },
  {
    path: "/login",
    element: withSuspense(LoginPage),
  },
]);

export default router;
