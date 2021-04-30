import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          />
        </div>

        <div className="w-6/12">
          <Button label="Save" className="p-button-success w-full mt-6" />
        </div>
      </div>
    </div>
  );
}

export default Login;
