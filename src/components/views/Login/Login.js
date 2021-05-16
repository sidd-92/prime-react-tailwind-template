import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import AuthService from "../../../services/AuthService";
import { linkAdmin, linkHome } from "../../../routes";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const login = () => {
    if (email === "" || password === "") {
      setErrorMessage("Email / Password Fields Are Empty");
    } else {
      AuthService.login({ email: email, password: password })
        .then((result) => {
          if (result.data) {
            setLoginSuccess(true);
            localStorage.setItem(
              "userinfo",
              JSON.stringify({
                token: result.data["token"],
                refresh: result.data["refreshToken"],
              })
            );
            getUser(result.data["token"]);
          }
        })
        .catch((error) => {
          setLoginSuccess(false);
          setErrorMessage("Login Failed");
        });
    }
  };

  const getUser = (token) => {
    AuthService.decode({ token: token }).then((result) => {
      if (result.data.user) {
        console.log("RESULT", result.data);
        if (result.data.user.isAdmin) {
          props.history.push(linkAdmin);
        } else {
          props.history.push(linkHome);
        }
      }
      let error = document.getElementById("errorDiv12399");
      if (error) {
        error.remove();
      }
    });
  };

  return (
    <div className="max-w-6xl xxl:max-w-4xl mx-auto">
      <div className="bg-gray-200 h-screen flex flex-col items-center justify-center">
        <div className="text-3xl font-black text-button2 mb-4">Login</div>
        <div className="w-10/12 xxl:w-6/12 mb-4">
          <InputText
            className="w-full"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-10/12 xxl:w-6/12">
          <Password
            className="w-full"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            feedback={false}
          />
        </div>

        <div className="w-10/12 xxl:w-6/12">
          <Button
            label="Login"
            onClick={() => login()}
            className="p-button-success w-full mt-6"
          />
        </div>
        <div className="mt-4 h-2">
          {loginSuccess ? "Logged In" : errorMessage}
        </div>
      </div>
    </div>
  );
}

export default Login;
