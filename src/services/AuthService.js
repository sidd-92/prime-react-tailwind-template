import axios from "axios";

import React from "react";
import ReactDOM from "react-dom";
import BaseApiService from "./BaseApiService";
const DEFAULT_API_PATH = "https://auth-api-express.onrender.com/api";

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
          console.log("API Response ERROR...");
          if (
            (error.response.status === 401 || error.response.status === 403) &&
            error.config &&
            !error.config.___retry
          ) {
            originalReq.___retry = true;
            console.log("AA>> auth error...");
            return new Promise((resolve, reject) => {
              console.log("AA>> trying renew auth...");
              var userInfo = JSON.parse(localStorage.getItem("userinfo"));
              let res = fetch(DEFAULT_API_PATH + "/user/token", {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: userInfo.refresh }),
              })
                .then((res) => res.json())
                .then((res) => {
                  console.log("REULT", res);
                  var userinfo = JSON.parse(localStorage.getItem("userinfo"));
                  if (res.token) {
                    userinfo.token = res.token;
                    localStorage.setItem("userinfo", JSON.stringify(userinfo));
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
                  console.log(JSON.stringify(err, null, 3));
                  console.log("FAIled");
                  return Promise.reject(err);
                  //return reject(err);
                  //throw Error(err);
                });
              resolve(res);
            });
          } else if (
            //failed after refresh...
            (error.response.status === 401 || error.response.status === 403) &&
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
  login(data) {
    return axios.post(`${DEFAULT_API_PATH}/user/login`, data);
  }

  decode(token) {
    return axios.post(`${DEFAULT_API_PATH}/user/decode`, token);
  }
}

export default new AuthService();
