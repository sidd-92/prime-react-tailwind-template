import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { linkHome, linkNamePosts, linkPosts } from "../routes";

function Header() {
  let location = useLocation();
  return (
    <nav className="navbar">
      <NavLink
        to={linkHome}
        className={
          location.pathname === linkHome ? "nav-link make-active" : "nav-link"
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to={linkPosts}
        className={
          location.pathname === linkPosts ? "nav-link make-active" : "nav-link"
        }
      >
        {linkNamePosts}
      </NavLink>
      <NavLink
        to={"/review"}
        className={
          location.pathname === "/review" ? "nav-link make-active" : "nav-link"
        }
      >
        Review & Release Order
      </NavLink>
    </nav>
  );
}

export default Header;
