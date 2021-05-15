import React, { useState, useRef, useEffect } from "react";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import axios from "axios";
import { useHistory } from "react-router";
import { linkHome, linkLogin } from "../../../routes";
import AuthService from "../../../services/AuthService";
const Admin = () => {
  const [profileImgURL, setProfileImgURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const uploadRef = useRef(null);
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
  });

  const uploadedHandler = (event) => {
    setLoading(true);

    var form = new FormData();
    event.files.forEach((file) => {
      form.append("avatar", file);
    });
    axios
      .post("https://auth-api-express.onrender.com/profile", form)
      .then((response) => {
        setProfileImgURL(response.data.url);
        uploadRef.current.clear();
        setLoading(false);
      })
      .catch((err) => {
        uploadRef.current.clear();
        setLoading(false);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Something Wen Wrong",
        });
      });
  };

  return (
    <div className="m-2">
      <Toast ref={toast}></Toast>
      <div className="text-3xl font-extrabold">Admin</div>
      <div className="font-bold mt-4">Form</div>
      <div className="flex items-center">
        <FileUpload
          ref={uploadRef}
          mode="basic"
          name="avatar"
          accept="image/*"
          disabled={loading}
          chooseLabel="Choose A File"
          customUpload
          uploadHandler={(event) => uploadedHandler(event)}
        />
      </div>
      {profileImgURL ? (
        <img src={profileImgURL} alt="prof" className="w-5/12" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Admin;
