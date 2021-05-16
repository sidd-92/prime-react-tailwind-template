import React, { useEffect, useState, useRef } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import AuthService from "../services/AuthService";
import routes, { linkAdmin, linkLogin } from "../routes";
import AuthValidator from "../components/AuthValidator/AuthValidator";
import AdminValidator from "../components/AdminValidator/AdminValidator";
import Header from "./Headers";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

function DefaultLayout() {
  const [isAdmin, setisAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const toast = useRef(null);
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
        let error = document.getElementById("errorDiv12399");
        if (error) {
          error.remove();
        }
      })
      .catch((err) => {
        //setShowModal(true);
        /* setTimeout(() => {
          history.replace(linkLogin);
          localStorage.clear();
        }, 2000); */
      });
  }, []);

  return (
    <div>
      <Header isAdmin={isAdmin} />
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
      <Dialog
        header="Header"
        visible={showModal}
        style={{ width: "50vw" }}
        onHide={() => {
          localStorage.clear();
          history.replace(linkLogin);
        }}
      >
        <p>No Token Found, Will Redirect To Login Now..</p>
      </Dialog>
    </div>
  );
}

export default DefaultLayout;
