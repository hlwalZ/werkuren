import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="bg-pastelGrijs bg-opacity-60 mb-5 pb-2.5 pt-2.5 text-2xl text-center flex justify-center items-center">
        <NavLink
          to="/"
          className="pl-2 pr-2 hover:bg-pastelGrijs hover:bg-opacity-100 hover:rounded-xl"
        >
          Home
        </NavLink>
        <NavLink
          to="/add-hours"
          className=" pl-2 pr-2 hover:bg-pastelGrijs hover:bg-opacity-100 hover:rounded-xl"
        >
          Add Hours
        </NavLink>
      </nav>
    </>
  );
};

export default NavBar;
