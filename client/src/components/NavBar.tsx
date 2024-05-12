import React from "react";
import { Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="bg-pastelGrijs bg-opacity-60 mb-5 pb-5 text-2xl text-center">
        Hallo
      </div>

      <Outlet />
    </>
  );
};

export default NavBar;
