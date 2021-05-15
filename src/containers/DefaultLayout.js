import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../routes";
import AuthValidator from "../components/AuthValidator/AuthValidator";
import Header from "./Headers";

function DefaultLayout() {
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
                    return (
                      <AuthValidator
                        authorizedcomponent={route.component}
                        urlpath={route.path}
                        {...props}
                      />
                    );
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
