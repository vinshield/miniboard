"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "@/lib/actions/clerk.actions";

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("pendingUsername");
    
    async function processOAuthCallback() {
      try {
        // First handle the OAuth callback
        // await handleRedirectCallback();
        
        if (username) {
          // Then update the username using server action
          const result = await updateUserProfile({ username });

          if (result.success) {
            localStorage.removeItem("pendingUsername"); // Clean up
            router.push(`/signup/[[...signup]]?step=bio&username=${username}`);
          } else {
            console.error("Failed to update username");
            router.push("/signup");
          }
        } else {
          console.log("No username found in localStorage");
          router.push("/");
        }
      } catch (err) {
        console.error("Error handling OAuth callback:", err);
        localStorage.removeItem("pendingUsername"); // Clean up on error
        router.push("/signup");
      }
    }

    processOAuthCallback();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-2 text-xl">Setting up your account...</h2>
        <p className="text-gray-600">Please wait while we complete the process.</p>
      </div>
    </div>
  );
}