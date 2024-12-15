"use client";

import { useState } from "react";
import { UsernameForm } from "./UsernameForm";
import { SignUpOptions } from "./SignUpOptions";
import { BioForm } from "./BioForm";

export default function SignUpFlow() {
  const [step, setStep] = useState("username");
  const [username, setUsername] = useState("");

  const handleUsernameSubmit = (selectedUsername) => {
    setUsername(selectedUsername);
    setStep("signup");
  };

  const handleSignUpComplete = () => {
    setStep("bio");
  };

  const handleBioSubmit = () => {
    // Here you would typically redirect to the user's profile or dashboard
    console.log("Sign-up flow complete!");
  };

  const changeUsername = () => {
    setStep("username");
  };

  return (
    <div className="container p-[20px] lg:p-[80px]">
      <div className="max-w-xl">
        {step === "username" && (
          <UsernameForm onSubmit={handleUsernameSubmit} />
        )}
        {step === "signup" && (
          <SignUpOptions
            username={username}
            onSignUpComplete={handleSignUpComplete}
            changeUsername={changeUsername}
          />
        )}
        {step === "bio" && <BioForm onSubmit={handleBioSubmit} />}
      </div>
    </div>
  );
}
