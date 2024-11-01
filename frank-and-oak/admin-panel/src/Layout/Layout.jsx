import React, { useContext } from "react";
import { NavToggle } from "../Context/Context";
import DashboardSideNav from "../components/DashboardSideNav";
import Header from "../components/Header";
import Path from "../components/Path";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Layout = () => {
  let { navVisible, setNavVisibility } = useContext(NavToggle);
  return (
    <>
      <div
        className={
          navVisible === false
            ? "w-full grid grid-cols-[20%_auto] relative min-h-[100vh]"
            : "w-full grid grid-cols-[0_100%] relative min-h-[100vh]"
        }
      >
        <div className="w-full sticky h-[100vh] top-0 left-0">
          <DashboardSideNav />
        </div>
        <div className="w-full">
          <Header />
          <Path />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
