import React from "react";
import { NavLink } from "react-router-dom";
class Header extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <NavLink
          to={"/"}
          className={
            this.props.location.pathname === "/"
              ? "nav-link make-active"
              : "nav-link"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to={"/master"}
          className={
            this.props.location.pathname === "/master"
              ? "nav-link make-active"
              : "nav-link"
          }
        >
          MasterSKU
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
