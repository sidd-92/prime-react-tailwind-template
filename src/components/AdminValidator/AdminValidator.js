import React, { Component } from "react";
import { linkAdmin } from "../../routes";

export default class AdminValidator extends Component {
  constructor(props) {
    super(props);
  }
  isAdmin = () => {
    let c = JSON.parse(localStorage.getItem("userinfo"));
    if (c) {
      if (c.role === "admin") {
        return true;
      } else {
        return false;
      }
    }
  };
  render() {
    if (this.isAdmin()) {
      return <this.props.authorizedcomponent {...this.props} />;
    } else {
      this.props.history.push("/home");
      return <div></div>;
    }
  }
}
