import React, { Component } from "react";

export default class AuthValidator extends Component {
  constructor(props) {
    super(props);
    this.isValid = this.isValid.bind(this);
  }
  isValid = () => {
    console.log("PROPS", this.props.urlpath);
    let c = JSON.parse(localStorage.getItem("userinfo"));
    if (c) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    if (this.isValid()) {
      {
        return <this.props.authorizedcomponent {...this.props} />;
      }
    } else {
      this.props.history.push("/login");
      return <div></div>;
    }
  }
}
