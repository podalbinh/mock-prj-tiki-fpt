import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow bg-slate-100">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
