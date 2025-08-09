import { lazy, Suspense, type JSX } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingOverlay from "@/components/wrapper/LoadingOverlay";
import UserLayout from "@/layouts/user/UserLayout";
import AdminLayout from "@/layouts/admin/AdminLayout";
import { userLoader } from "./loaders/userLoader";
import { orderLoader } from "./loaders/orderLoader";
import RequireRoleWrapper from "@/components/wrapper/RequireRoleWrapper";
import Error403 from "@/pages/403";
import Error404 from "@/pages/404";
import { categoryLoader } from "./loaders/categoryLoader";

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
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: withSuspense(HomePage),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <RequireRoleWrapper role="ADMIN">
        <AdminLayout />
      </RequireRoleWrapper>
    ),
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: withSuspense(lazy(() => import("@/pages/AdminDashboard"))),
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
        element: withSuspense(lazy(() => import("@/pages/CategoryManagement"))),
        loader: categoryLoader,
      },
      {
        path: "/admin/categories/create",
        element: <div>Thêm danh mục</div>,
      },
      {
        path: "/admin/users",
        element: withSuspense(lazy(() => import("@/pages/UserManagement"))),
        loader: userLoader,
      },
      {
        path: "/admin/orders",
        element: withSuspense(lazy(() => import("@/pages/OrderManagement"))),
        loader: orderLoader,
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
  {
    path: "/403",
    element: <Error403 />,
  },
]);

export default router;
