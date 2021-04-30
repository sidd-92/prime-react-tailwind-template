import React from "react";
import { NavLink } from "react-router-dom";
import { linkHome, linkNamePosts, linkPosts } from "../routes";
class Header extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <NavLink
          to={linkHome}
          className={
            this.props.location.pathname === linkHome
              ? "nav-link make-active"
              : "nav-link"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to={linkPosts}
          className={
            this.props.location.pathname === linkPosts
              ? "nav-link make-active"
              : "nav-link"
          }
        >
          {linkNamePosts}
        </NavLink>
        <NavLink
          to={"/review"}
          className={
            this.props.location.pathname === "/review"
              ? "nav-link make-active"
              : "nav-link"
          }
        >
          Review & Release Order
        </NavLink>
      </nav>
    );
  }
}

export default Header;
