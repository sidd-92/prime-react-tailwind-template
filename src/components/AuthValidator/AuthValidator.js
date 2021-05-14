import React, { Component } from "react";

export default class AuthValidator extends Component {
  render() {
    return <this.props.authorizedcomponent {...this.props} />;
  }
}
