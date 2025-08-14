import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import FreeshipBanner from "@/components/common/FreeshipBanner";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <FreeshipBanner />
      <Header />
      <div className="flex-grow bg-slate-100 px-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
