import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import AuthService from "../../../services/AuthService";
import { linkAdmin, linkHome, linkNameHome } from "../../../routes";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const login = () => {
    if (email === "" || password === "") {
      setErrorMessage("Email / Password Fields Are Empty");
    } else {
      AuthService.login({ username: email, password: password })
        .then((result) => {
          if (result.data) {
            setLoginSuccess(true);
            localStorage.setItem("userinfo", JSON.stringify(result.data));
            getUser(result.data.id);
          }
        })
        .catch((error) => {
          setLoginSuccess(false);
          setErrorMessage("Login Failed");
        });
    }
  };

  const getUser = (id) => {
    if (id) {
      AuthService.getUserById(id).then((result) => {
        if (result.data) {
          if (result.data.role === "admin") {
            props.history.push(linkAdmin);
          } else {
            props.history.push(linkHome);
          }
        }
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gray-200 h-screen flex flex-col items-center justify-center">
        <div className="text-3xl font-black text-button2 mb-4">Login</div>
        <div className="w-6/12 mb-4">
          <InputText
            className="w-full"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-6/12">
          <Password
            className="w-full"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            feedback={false}
          />
        </div>

        <div className="w-6/12">
          <Button
            label="Save"
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
