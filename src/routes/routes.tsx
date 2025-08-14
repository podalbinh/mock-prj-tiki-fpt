import { lazy, Suspense, type JSX } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingOverlay from "@/components/wrapper/LoadingOverlay";
import UserLayout from "@/layouts/user/UserLayout";
import AdminLayout from "@/layouts/admin/AdminLayout";
import { userLoader } from "./loaders/userLoader";
import { bookLoader } from "@/routes/loaders/bookLoader.tsx";
import { orderLoader } from "./loaders/orderLoader";
import RequireRoleWrapper from "@/components/wrapper/RequireRoleWrapper";
import Error403 from "@/pages/403";
import Error404 from "@/pages/404";
import { categoryLoader } from "./loaders/categoryLoader";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ProfilePage = lazy(() => import("@/pages/Profile"));
const AccountInfo = lazy(() => import("@/pages/AccountInfo"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const Orders = lazy(() => import("@/pages/MyOrders"));
const Cart = lazy(() => import("@/pages/CartPage"));
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
      {
        path: "profile",
        element: withSuspense(ProfilePage), // <- Trang chứa layout sidebar + Outlet
        children: [
          {
            index: true,
            element: withSuspense(AccountInfo), // Mặc định là thông tin tài khoản
          },
          {
            path: "account-info",
            element: withSuspense(AccountInfo),
          },
          {
            path: "notifications",
            element: withSuspense(Notifications),
          },
          {
            path: "orders",
            element: withSuspense(Orders),
          },
        ],
      },
      {
        path: "cart",
        element: withSuspense(Cart),
      }
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
        element: withSuspense(lazy(() => import("@/pages/BookManage.tsx"))),
        loader: bookLoader,
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
        path: "/admin/orders/statistics",
        element: withSuspense(lazy(() => import("@/pages/OrderStatistics"))),
        loader: orderLoader,
      },
    ],
  },
  {
    path: "/login",
    element: withSuspense(lazy(() => import("@/pages/LoginAdmin"))),
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
