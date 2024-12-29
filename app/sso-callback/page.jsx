"use client";

import { useClerk, useSignUp } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateUserProfile } from "@/lib/actions/clerk.actions";


export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const { signUp, setActive } = useSignUp();
  const router = useRouter();
  const searchParams = useSearchParams();

    useEffect(() => {
      const username = localStorage.getItem("pendingUsername");
      
      
      async function processOAuthCallback() {
        try {
          
          const result = await updateUserProfile({ username });

          if (result.success) {
            localStorage.removeItem("pendingUsername"); // Clean up
            router.push(`/signup/[[...signup]]?step=bio&username=${username}`);

          } else {
            console.error("Failed to update username");
            router.push("/signup");
          }
          
        
        } catch (err) {
          console.error("Error handling OAuth callback:", err);
          localStorage.removeItem("pendingUsername"); // Clean up on error
          router.push("/signup");
        }
      }
  
      if (username) {
        processOAuthCallback();
      } else {
        router.push("/signup");
      }
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

// import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

// export default function Page() {
//   return <AuthenticateWithRedirectCallback />
// }