"use client";

import { useState, useEffect } from "react";
import { UsernameForm } from "./UsernameForm";

import { SignUpPage } from "./SignUpPage";
import { BioForm } from "./BioForm";
import { SocialLinksForm } from "./SocialLinksForm";

import { useRouter, useSearchParams } from "next/navigation";

export default function SignUpFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(searchParams.get("step") || "username");
  const [username, setUsername] = useState(searchParams.get("username") || "");

  useEffect(() => {
    const urlStep = searchParams.get("step");
    const urlUsername = searchParams.get("username");

    if (urlStep) {
      setStep(urlStep);
    }
    if (urlUsername) {
      setUsername(urlUsername);
      // Clear the stored username from localStorage
      localStorage.removeItem("pendingUsername");
    }
  }, [searchParams]);

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
    router.push(`/${username}`);
  };

  const changeUsername = () => {
    setStep("username");
  };

  const changeBio = () => {
    setStep("bio");
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
          <SocialLinksForm onSubmit={handleInfoSubmit} changeBio={changeBio} />
        )}
      </div>
    </div>
  );
}
