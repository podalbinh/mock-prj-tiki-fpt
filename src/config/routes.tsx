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
        index: true,
        element: <div>FAKE DASHBOARD</div>,
      },
      {
        path: "/admin/dashboard",
        element: <div>Dashboard</div>,
      },
      {
        path: "/admin/products",
        element: <div>Danh sách sản phẩm</div>,
      },
      {
        path: "/admin/products/create",
        element: <div>Thêm sản phẩm</div>,
      },
      {
        path: "/admin/categories",
        element: <div>Danh sách danh mục</div>,
      },
      {
        path: "/admin/categories/create",
        element: <div>Thêm danh mục</div>,
      },
      {
        path: "/admin/users",
        element: <div>Danh sách người dùng</div>,
      },
      {
        path: "/admin/users/create",
        element: <div>Thêm người dùng</div>,
      },
      {
        path: "/admin/orders",
        element: <div>Danh sách đơn hàng</div>,
      },
      {
        path: "/admin/orders/pending",
        element: <div>Đơn hàng chờ xử lý</div>,
      },
    ],
  },
  {
    path: "/admin/login",
    element: withSuspense(lazy(() => import("@/pages/LoginAdmin"))),
  },
]);

export default router;
