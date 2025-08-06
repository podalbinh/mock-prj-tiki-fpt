import { lazy, Suspense, type JSX } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingOverlay from "@/components/wrapper/LoadingOverlay";
import UserLayout from "@/layouts/user/UserLayout";

// Lazy load pages
// const LoginPage = lazy(() => import("@/pages/Login"));
const HomePage = lazy(() => import("@/pages/HomePage"));

const withSuspense = (
  Component: React.LazyExoticComponent<() => JSX.Element>
) => (
  <Suspense fallback={<LoadingOverlay isVisible />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: withSuspense(HomePage),
      },
    ],
  },
  {
    path: "/admin",
    element: withSuspense(lazy(() => import("@/layouts/admin/AdminLayout"))),
    children: [
      {
        path: "/admin/dashboard",
        element: <div>FAKE DASHBOARD</div>,
      },
    ],
  },
  {
    path: "/admin/login",
    element: withSuspense(lazy(() => import("@/pages/LoginAdmin"))),
  },
]);

export default router;
