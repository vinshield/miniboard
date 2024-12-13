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

  return (
    <div className="container mx-auto max-w-md p-6">
      {step === "username" && <UsernameForm onSubmit={handleUsernameSubmit} />}
      {step === "signup" && (
        <SignUpOptions
          username={username}
          onSignUpComplete={handleSignUpComplete}
        />
      )}
      {step === "bio" && <BioForm onSubmit={handleBioSubmit} />}
    </div>
  );
}
