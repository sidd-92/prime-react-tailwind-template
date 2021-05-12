import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes, { linkAdmin } from "../routes";
import AuthValidator from "../components/AuthValidator/AuthValidator";
import Header from "./Headers";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { TieredMenu } from "primereact/tieredmenu";
import AdminValidator from "../components/AdminValidator/AdminValidator";
class DefaultLayout extends React.Component {
  render() {
    return (
      <div>
        {JSON.parse(localStorage.getItem("userinfo")) &&
        JSON.parse(localStorage.getItem("userinfo"))["role"] === "admin" ? (
          <div>Admin Header</div>
        ) : (
          <Header location={this.props.location} />
        )}

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
                      if (route.path === linkAdmin) {
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
}

export default DefaultLayout;
