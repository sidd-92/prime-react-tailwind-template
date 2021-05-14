import React, { useState, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import axios from "axios";
const Admin = (props) => {
  const [profileImgURL, setProfileImgURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const toast = useRef(null);
  const uploadRef = useRef(null);

  const uploadedHandler = (event) => {
    setLoading(true);

    var form = new FormData();
    event.files.forEach((file) => {
      form.append("avatar", file);
    });
    axios
      .post("http://localhost:3001/profile", form)
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
