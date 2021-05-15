import React from "react";
function AdminValidator(props) {
  return <props.authorizedcomponent {...props} />;
}

export default AdminValidator;
