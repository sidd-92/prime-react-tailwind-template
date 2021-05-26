import React, { useState, useRef, useEffect } from "react";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { useHistory } from "react-router";
import { linkHome, linkLogin } from "../../../routes";
import AuthService from "../../../services/AuthService";
import UploadService from "../../../services/UploadService";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import RecipieService from "../../../services/RecipieService";
const Admin = () => {
  const [profileImgURL, setProfileImgURL] = useState(null);
  const [imageCaption, setImageCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const uploadRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [instruction, setInstruction] = useState([]);
  const [forPreparing, handleForPreparing] = useState("");

  /**
   * FINAL RECIPIE ARRAY MUST LOOK LIKE
   *
   * [
   *  recipieName: "",
   *  recipieDescription:"",
   *  ingredients: [
   *    {
   *      _id: "",
   *      name: "",
   *      for: ""
   *    }],
   *  instructions: [
   *    {
   *      for: "",
   *      stepDetail: "",
   *      stepNumber: ""
   *    }]
   * ]
   *
   */

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
          let error = document.getElementById("errorDiv12399");
          if (error) {
            error.remove();
          }
        })
        .catch((error) => {
          console.log("No User Found");
          history.push(linkHome);
        });
    } else {
      history.push(linkLogin);
    }
  }, [history]);

  const uploadedHandler = (event) => {
    setLoading(true);

    var form = new FormData();
    event.files.forEach((file) => {
      form.append("avatar", file);
    });
    console.log("FIORM", form);
    UploadService.upload(form)
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

  const handleSubmit = () => {
    if (imageCaption.length > 0 && profileImgURL) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Saved",
      });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Some Required Fields Are Not Filled",
      });
    }
  };

  const renderDynamicForm = () => {
    return (
      <>
        <div className="font-bold mb-2">Step 1</div>
        <div className="flex items-center">
          <InputTextarea
            autoResize
            rows={3}
            cols={50}
            value={imageCaption}
            onChange={(e) => setImageCaption(e.target.value)}
          />

          <div className="ml-2">
            <Button
              label=""
              className="bg-red-600 border-none"
              icon="pi pi-minus"
              onClick={() => handleSubmit()}
            />
          </div>
        </div>
      </>
    );
  };

  let saveFormData = () => {
    /**
       * {
    "imageId":"60a7a9f44da4e50023abeee8",
    "recipieName": "Bun Dosa",
    "recipieDescription":"How To Make Bun Dosa",
    "recipieTotalTime": "20 Min",
    "recipieIngredients": ["Dosa Batter", "Oil", "Salt"]
}
       */
    RecipieService.addRecipie({
      imageId: "60a7a9f44da4e50023abeee8",
      recipieName: "Bun Dosa",
      recipieDescription: "How To Make Bun Dosa",
      recipieTotalTime: "20 Min",
      recipieIngredients: ["Dosa Batter", "Oil", "Salt"],
    })
      .then((result) => {
        if (result.data) {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Recipie Added",
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Server Error",
        });
      });
  };

  const addNextInstruction = () => {
    //Here I want to add the next instruction with correct Step number and blank text field.
    //Admin Can Delete the Text Field and should be updated in the state
  };

  return (
    <div className="m-2">
      <Toast ref={toast}></Toast>
      <div className="text-3xl font-extrabold">Admin</div>
      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        <TabPanel header="Add Posts">
          <div>
            <div className="font-bold mt-4 mb-2">Add Recipie Steps</div>
            <div>
              <div className="font-bold mt-4 mb-2">For Preparing:</div>
              <div>
                <InputText
                  value={forPreparing}
                  onChange={(e) => handleForPreparing(e.target.value)}
                />
              </div>
              <div className="bg-gray-200 p-2 mt-2">
                {renderDynamicForm()}
                <Button
                  label="Add Next Instruction"
                  className="bg-yellow-600 border-none mt-6"
                  icon="pi pi-plus"
                  onClick={addNextInstruction}
                />
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Manage Posts">
          <div>All Posts</div>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Admin;

/* <div>
            <div className="font-bold mt-4 mb-2">Image Caption (Required)*</div>
            <div>
              <InputText
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
              />
            </div>
            <div className="font-bold mt-4 mb-2">Image File (Required)*</div>
            <div className="flex items-center">
              <FileUpload
                ref={uploadRef}
                mode="basic"
                name="avatar"
                accept="image/*"
                auto={true}
                disabled={loading}
                chooseLabel="Choose A File"
                customUpload
                uploadHandler={(event) => uploadedHandler(event)}
              />
            </div>
            {profileImgURL ? (
              <>
                <img src={profileImgURL} alt="prof" className="w-40" />
                <div className="font-bold mt-4">Image URL</div>
                <div>
                  <InputText
                    disabled={true}
                    value={profileImgURL}
                    className="w-1/2"
                  />
                </div>
              </>
            ) : (
              <></>
            )}

            <Button
              label="Save"
              className="bg-teal-600 border-none mt-6 w-1/6"
              icon="pi pi-check"
              onClick={() => handleSubmit()}
            />
          </div> */
