import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthService from "../services/AuthService";
import routes from "../routes";
import AuthValidator from "../components/AuthValidator/AuthValidator";
import AdminValidator from "../components/AdminValidator/AdminValidator";
import Header from "./Headers";

function DefaultLayout() {
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    let c = localStorage.getItem("userinfo");
    AuthService.decode(JSON.parse(c))
      .then((result) => {
        if (result.data.user) {
          if (result.data.user.isAdmin) {
            setisAdmin(true);
          } else {
            setisAdmin(false);
          }
        }
      })
      .catch((err) => {
        setisAdmin(false);
      });
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
