import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { linkHome, linkLogin } from "../../../routes";
import AuthService from "../../../services/AuthService";

function Dashboard() {
  let history = useHistory();

  useEffect(() => {
    let c = localStorage.getItem("userinfo");
    if (c) {
      AuthService.decode(JSON.parse(c))
        .then((result) => {
          if (result.data.user) {
            if (result.data.user.isAdmin) {
            } else {
              history.push(linkHome);
            }
          }
        })
        .catch((error) => {
          console.log("No User Found");
          history.push(linkHome);
        });
    } else {
      history.push(linkLogin);
    }
  }, [history]);
  return (
    <div className=" h-screen text-button2 font-bold text-6xl">Dashboard</div>
  );
}

export default Dashboard;
