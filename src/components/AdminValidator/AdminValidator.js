import React, { useState, useEffect } from "react";
import AuthService from "../../services/AuthService";
import { useHistory } from "react-router-dom";
function AdminValidator(props) {
  return <props.authorizedcomponent {...props} />;
}

export default AdminValidator;
