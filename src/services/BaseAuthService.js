import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import BaseApiService from "./BaseApiService";

const DEFAULT_AUTH_PATH = "/user";

class AuthService extends BaseApiService {
  constructor(props) {
    super(props);

    var _this = this;
    this.getAxios().interceptors.request.use(
      function (config) {
        console.log("Making API Request...");
        // Do something before request is sent
        return config;
      },
      function (error) {
        console.log("API Request ERROR...");
        // Do something with request error
        return Promise.reject(error);
      }
    );

    console.log("Creating interceptor...");
    // Add a response interceptor

    this.getAxios().interceptors.response.use(
      (response) => {
        console.log("API Response received...");
        // Do something with response data
        return response;
      },
      (error) => {
        const originalReq = error.config;
        if (typeof window === "undefined") {
        } else {
          let url = _this.getDefaultApiUrl();
          let authHeader = _this.getAuthHeader();

          console.log("API Response ERROR...");
          if (
            error.response.status === 401 &&
            error.config &&
            !error.config.___retry
          ) {
            originalReq.___retry = true;
            console.log("AA>> auth error...");
            return new Promise((resolve, reject) => {
              console.log("AA>> trying renew auth...");
              var userInfo = JSON.parse(localStorage.getItem("userInfo"));
              let res = fetch(url + DEFAULT_AUTH_PATH + "/token", {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: userInfo.token }),
              })
                .then((res) => res.json())
                .then((res) => {
                  var userinfo = JSON.parse(localStorage.getItem("userInfo"));
                  if (res.token) {
                    userinfo.token = res.token;
                    localStorage.setItem("userInfo", JSON.stringify(userinfo));
                  }
                  var newHeaders = {
                    Authorization: "Bearer " + userinfo.token,
                  };
                  //originalReq.headers = newHeaders;
                  originalReq.headers = {
                    ...originalReq.headers,
                    ...newHeaders,
                  };
                  //
                  return _this.getAxios()(originalReq);
                })
                .catch((err) => {
                  console.log(err);
                  return Promise.reject(err);
                  //return reject(err);
                  //throw Error(err);
                });
              resolve(res);
            });
          } else if (
            //failed after refresh...
            error.response.status === 401 &&
            error.config &&
            error.config.___retry
          ) {
            ReactDOM.render(
              <h1 className="flex flex-row w-full items-center justify-center bg-red-700 h-16 text-white">
                PLEASE LOG IN AGAIN...
              </h1>,
              document.getElementById("errorDiv12399")
            );
          }
        }
        return Promise.reject(error);
      }
    );
  }
  /* 
  login(credentials) {
    let url = this.getDefaultApiUrl();

    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(credentials.username + ":" + credentials.password),
    };
    return axios.post(url + DEFAULT_AUTH_PATH + "/token", null, {
      headers: headers,
    });
  }

  forgotPasswordGenerateOTP(credentials) {
    let url = this.getDefaultApiUrl();
    return axios.post(
      url +
        DEFAULT_AUTH_PATH +
        "/user/reset/password/otp?username=" +
        credentials.username
    );
  }

  forgotPasswordResetPassword(credentials) {
    let url = this.getDefaultApiUrl();
    const body = {
      username: credentials.username,
      password: credentials.password,
      otp: credentials.otp,
    };
    return axios.post(url + DEFAULT_AUTH_PATH + "/user/reset/password", body);
  }

  refresh(credentials) {
    return axios.post("token/renew", credentials);
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"));
  }

  getAuthHeader() {
    return {
      headers: { Authorization: "Bearer " + this.getUserInfo().accessToken },
    };
  }

  getRefreshCredentials() {
    return {
      username: this.getUserInfo().username,
      refreshToken: this.getUserInfo().refreshtoken,
    };
  }

  logOut() {
    localStorage.removeItem("userInfo");
    return;
  } */
}

export default new AuthService();
