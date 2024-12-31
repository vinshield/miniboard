"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, ArrowLeft } from "lucide-react";

export function SignUpPage({ username, onSignUpComplete, changeUsername }) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setCreatingUser(true);
      const result = await signUp.create({
        username,
        emailAddress: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        onSignUpComplete();
      } else {
        console.error("Sign up failed", result);
        setError("Sign up failed. Please try again.");
        setCreatingUser(false);
      }
    } catch (err) {
      console.error("Error during sign up:", err);
      setError(err.message || "An error occurred during sign up.");
      setCreatingUser(false);
    }
  };

  const handleOAuthSignUp = async (strategy) => {
    if (!isLoaded) return;

    try {
      // Store the username before OAuth flow
      localStorage.setItem("pendingUsername", username);

      // Start OAuth flow directly
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/", // page to link to if user already has an account
        redirectUrlComplete: "/sso-callback", // page to link to to create new account
      });
    } catch (err) {
      console.error("Error during OAuth signup:", err);
      localStorage.removeItem("pendingUsername");
      setError(err.message || "An error occurred during sign up with " + strategy);
    }
  };

  return (
    <div className="mt-4 flex flex-col justify-center">
      <ArrowLeft className="mb-20" onClick={changeUsername} />
      {username && (
        <p className="mb-2 text-sm text-grey-500">
          Great! <span className="text-primary">{username}.miniboard.site</span>{" "}
          is yours
        </p>
      )}
      <h2 className="leading-12 mb-16 block text-4xl font-semibold tracking-tighter md:text-4xl">
        Now, create your account
      </h2>

      <div className="w-full max-w-md space-y-8">
        <div className="my-4 grid gap-y-4">
          <div className="grid grid-cols-2 gap-x-2">
            <Button
              variant="outline"
              type="button"
              disabled={!isLoaded}
              onClick={() => handleOAuthSignUp("oauth_google")}
            >
              {isLoaded ? (
                <div className="flex items-center gap-x-2">
                  <i className="ci ci-google ci-1x"></i>
                  {/* <GoogleIcon className="mr-2 size-4" /> */}
                  Google
                </div>
              ) : (
                <LoaderCircle className="size-4 animate-spin" />
              )}
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={!isLoaded}
              onClick={() => handleOAuthSignUp("oauth_tiktok")}
            >
              {isLoaded ? (
                <div className="flex items-center gap-x-2">
                  <i className="ci ci-tiktok ci-1x"></i>
                  {/* <TikTokIcon className="mr-2 size-4" /> */}
                  TikTok
                </div>
              ) : (
                <LoaderCircle className="size-4 animate-spin" />
              )}
            </Button>
          </div>
          <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
            or
          </p>

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="grid gap-y-2 -space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Input
                  className="input-field min-w-[20px] rounded-lg px-4 py-6 text-base placeholder:text-[#a8a8a8]"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Input
                  className="input-field min-w-[20px] rounded-lg px-4 py-6 text-base placeholder:text-[#a8a8a8]"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                />
              </div>
            </div>

            {error && <div className="mt-2 text-sm text-red-500">{error}</div>}

            <div className="grid w-full gap-y-4">
              <Button
                type="submit"
                disabled={!isLoaded || creatingUser}
                size="lg"
                variant="test"
                className="min-w-2/5 mt-6 rounded-lg bg-sky-500 px-6 py-7 disabled:bg-sky-500"
              >
                {creatingUser ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
            <div className="flex-center mt-20">
              <Button variant="link" size="sm" asChild>
                <Link href="signin">Already have an account? Log in</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
