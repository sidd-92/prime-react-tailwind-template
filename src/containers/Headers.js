import React from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { linkHome, linkLogin, linkNamePosts, linkPosts } from "../routes";
import { Button } from "primereact/button";

function Header() {
  let location = useLocation();
  let history = useHistory();
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
      <Button
        label="Logout"
        className="ml-auto p-button-danger"
        onClick={() => {
          localStorage.clear();
          history.push(linkLogin);
        }}
      />
    </nav>
  );
}

export default Header;
