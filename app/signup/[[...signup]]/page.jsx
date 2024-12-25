"use client";

import { useState } from "react";
import { UsernameForm } from "./UsernameForm";

import { SignUpPage } from "./SignUpPage";
import { BioForm } from "./BioForm";
import { SocialLinksForm } from "./SocialLinksForm";

import { useRouter } from "next/navigation";

export default function SignUpFlow() {
  const router = useRouter();

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
    setStep("socialLinks");
  };

  const handleInfoSubmit = () => {
    // Here you would typically redirect to the user's profile or dashboard
    console.log("Sign-up flow complete!");
    router.push("/");
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
          <SignUpPage
            username={username}
            onSignUpComplete={handleSignUpComplete}
            changeUsername={changeUsername}
          />
        )}
        {step === "bio" && (
          <BioForm onSubmit={handleBioSubmit} username={username} />
        )}
        {step === "socialLinks" && (
          <SocialLinksForm onSubmit={handleInfoSubmit} />
        )}
      </div>
    </div>
  );
}
