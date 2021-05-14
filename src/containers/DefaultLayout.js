import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import routes, { linkAdmin } from "../routes";
import AuthValidator from "../components/AuthValidator/AuthValidator";
import Header from "./Headers";
import AdminValidator from "../components/AdminValidator/AdminValidator";
import AuthService from "../services/AuthService";

function DefaultLayout(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  let history = useHistory();

  const getUser = () => {
    let c = JSON.parse(localStorage.getItem("userinfo"));
    if (c) {
      AuthService.getUserById(c.id)
        .then((result) => {
          if (result.data) {
            if (result.data.role === "admin") {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          }
        })
        .catch((error) => {
          console.log("No User Found");
          setIsAdmin(false);
        });
    }
  };

  const isValid = () => {
    console.log("PROPS", this.props.urlpath);
    let c = JSON.parse(localStorage.getItem("userinfo"));
    if (c) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => {
                    if (isAdmin) {
                      return (
                        <AdminValidator
                          authorizedcomponent={route.component}
                          urlpath={route.path}
                          {...props}
                        />
                      );
                    } else {
                      return (
                        <AuthValidator
                          authorizedcomponent={route.component}
                          urlpath={route.path}
                          {...props}
                        />
                      );
                    }
                  }}
                />
              ) : null;
            })}
            <Redirect from="/" to="/404" />
          </Switch>
        </React.Suspense>
      </main>
    </div>
  );
}

export default DefaultLayout;
