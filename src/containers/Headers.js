import React from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import {
  linkAdmin,
  linkHome,
  linkLogin,
  linkNamePosts,
  linkPosts,
} from "../routes";
import { Button } from "primereact/button";

function Header(props) {
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
      <div className="ml-auto">
        {props.isAdmin ? (
          <div className="font-thin">Logged In As Admin</div>
        ) : (
          <></>
        )}
      </div>
      <Button
        label="Logout"
        className="ml-4 p-button-danger"
        onClick={() => {
          let error = document.getElementById("errorDiv12399");
          if (error) {
            error.remove();
          }
          localStorage.clear();
          history.push(linkLogin);
        }}
      />
    </nav>
  );
}

export default Header;
