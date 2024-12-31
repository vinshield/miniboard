"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";

export function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      const result = await signIn.create({
        identifier,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        console.error("Sign in failed", result);
        setError(
          "Sign in failed. Please check your credentials and try again.",
        );
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error during sign in:", err);
      setError(err.message || "An error occurred during sign in.");
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (strategy) => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error("Error during OAuth signin:", err);
      setError(
        err.message || "An error occurred during sign in with " + strategy,
      );
    }
  };

  return (
    <div className="mt-4 flex flex-col justify-center">
      <p className="mb-1 text-3xl text-gray-500">Welcome back!</p>
      <h2 className="leading-12 mb-16 block text-4xl font-semibold tracking-tighter md:text-4xl">
        Sign in to your Miniboard
      </h2>

      <div className="w-full max-w-md space-y-8">
        <div className="my-4 grid gap-y-4">
          <div className="grid grid-cols-2 gap-x-2">
            <Button
              variant="outline"
              type="button"
              disabled={!isLoaded}
              onClick={() => handleOAuthSignIn("oauth_google")}
            >
              {isLoaded ? (
                <div className="flex items-center gap-x-2">
                  <i className="ci ci-google ci-1x"></i>
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
              onClick={() => handleOAuthSignIn("oauth_tiktok")}
            >
              {isLoaded ? (
                <div className="flex items-center gap-x-2">
                  <i className="ci ci-tiktok ci-1x"></i>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email-or-username" className="sr-only">
                Email or username
              </label>
              <Input
                className="input-field min-w-[20px] rounded-lg px-4 py-6 text-base placeholder:text-[#a8a8a8]"
                type="text"
                placeholder="Email or username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                className="input-field min-w-[20px] rounded-lg px-4 py-6 text-base placeholder:text-[#a8a8a8]"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
              />
              {/* <div className="flex justify-end">
                <Button variant="link" size="sm" className="text-xs" asChild>
                  <Link href="/forgot-password">Forgot password?</Link>
                </Button>
              </div> */}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              type="submit"
              disabled={!isLoaded || isLoading}
              size="lg"
              variant="test"
              className="min-w-2/5 mt-6 w-full rounded-lg"
            >
              {isLoading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>
            <div className="text-center text-sm">
              <Button variant="link" size="sm" className="mt-14" asChild>
                <Link href="signup">
                  Don&apos;t have an account?
                  <span className="font-bold">&nbsp;Sign up</span>
                </Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
