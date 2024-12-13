"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpOptions({ username, onSignUpComplete }) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isLoaded) {
    return null;
  }

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      await signUp.create({
        username,
        emailAddress: email,
        password,
      });
      await setActive({ session: signUp.createdSessionId });
      onSignUpComplete();
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred during sign up");
    }
  };

  const handleOAuthSignUp = async (provider) => {
    try {
      await signUp.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/onboarding",
      });
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred during sign up");
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleEmailSignUp} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full">
          Sign Up with Email
        </Button>
      </form>
      <div className="space-y-2">
        <Button
          onClick={() => handleOAuthSignUp("oauth_google")}
          variant="outline"
          className="w-full"
        >
          Sign Up with Google
        </Button>
        <Button
          onClick={() => handleOAuthSignUp("oauth_tiktok")}
          variant="outline"
          className="w-full"
        >
          Sign Up with TikTok
        </Button>
      </div>
    </div>
  );
}
