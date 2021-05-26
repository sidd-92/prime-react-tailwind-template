import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { linkHome, linkLogin } from "../../../routes";
import AuthService from "../../../services/AuthService";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

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

function Dashboard() {
  let history = useHistory();

  const [instruction, setInstruction] = useState([]);
  const [forPreparing, handleForPreparing] = useState("");
  const [imageCaption, setImageCaption] = useState("");

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

  const remove = () => {
    //Remove the Input Text from the state, can use the _id to identify which text field
  };

  const addNextInstruction = () => {
    //Here I want to add the next instruction with correct Step number and blank text field.
    //Admin Can Delete the Text Field and should be updated in the state
  };

  const renderDynamicForm = () => {
    return (
      <>
        <div className="font-bold mb-2 mt-2">Step 1</div>
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
              onClick={() => remove()}
            />
          </div>
        </div>
      </>
    );
  };

  const submitForm = () => {
    //Data Should Be Presented As Follows
    /**
     * instructions: [
     *    {
     *      _id: 0 //Same as Index
     *      for: "Preparing Dosa Batter",
     *      steps: [
     *        {
     *          stepDetail: "Soak 1 Cup of Rice for half day",
     *          stepNumber: "1",
     *          _id: 0
     *        },
     *        {
     *          stepDetail: "Grind The rice to make it as a paste using water ",
     *          stepNumber: "2",
     *          _id: 1
     *        }]
     *    },
     *    {
     *      _id: 1 //Same as Index
     *      for: "Making Dosa",
     *      steps: [
     *        {
     *          stepDetail: "Turn On Stove and keep a iron or stainless steel pan",
     *          stepNumber: "1",
     *          _id: 0
     *        }]
     *    }]
     */
    console.log("SUBMIT FORM");
  };
  return (
    <>
      <div className="m-2">
        <div className="font-bold my-4 text-2xl">Add Recipie Steps</div>
        <Button
          label="Add For Preparation"
          className="bg-blue-600 border-none mb-2"
          icon="pi pi-plus"
          onClick={addNextInstruction}
        />
        <div className="border border-gray-300 mt-4 p-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold">For Preparing:</div>
              <div>
                <InputText
                  value={forPreparing}
                  onChange={(e) => handleForPreparing(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-200 p-2 mt-2">
            {renderDynamicForm()}
            {renderDynamicForm()}
            <Button
              label="Add Next Instruction"
              className="bg-yellow-600 border-none mt-6"
              icon="pi pi-plus"
              onClick={addNextInstruction}
            />
          </div>
        </div>
        <div className="border border-gray-300 mt-4 p-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold">For Preparing:</div>
              <div>
                <InputText
                  value={forPreparing}
                  onChange={(e) => handleForPreparing(e.target.value)}
                />
              </div>
            </div>
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
        <Button
          label="Submit Form"
          className="bg-green-600 border-none mt-6 w-full"
          onClick={submitForm}
        />
      </div>
    </>
  );
}

export default Dashboard;
