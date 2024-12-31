"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ResetPasswordPage() {
  const { signIn, isLoaded } = useSignIn();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      setError("");

      const firstFactor = await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setEmailSent(true);
      setIsLoading(false);
    } catch (err) {
      console.error("Error sending reset password email:", err);
      setError(
        err.message || "An error occurred while sending the reset email.",
      );
      setIsLoading(false);
    }
  };

  const handleVerification = async (code) => {
    try {
      setIsLoading(true);
      setError("");

      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
      });

      if (signInAttempt.status == "complete") router.push("/");

      // If successful, redirect to reset success page or home
      //   router.push("/");
    } catch (err) {
      console.error("Error verifying code:", err);
      setError(err.message || "Invalid verification code. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col justify-center">
      <Link
        href="/signin"
        className="mb-8 text-sm text-gray-500 hover:text-gray-700"
      >
        ← Back to Sign In
      </Link>

      <h2 className="mb-2 text-3xl font-semibold tracking-tight">
        Reset your password
      </h2>
      <p className="mb-8 text-gray-500">
        Enter your email address and we&apos;ll send you instructions to reset
        your password.
      </p>

      <div className="w-full max-w-md">
        {!emailSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field min-w-[20px] rounded-lg px-4 py-6 text-base placeholder:text-[#a8a8a8]"
                autoComplete="email"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={!isLoaded || isLoading}
              size="lg"
              className="w-full"
            >
              {isLoading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                "Send Reset Instructions"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                Check your email for a reset link. If you don&apos;t see it,
                check your spam folder.
              </AlertDescription>
            </Alert>

            <form className="space-y-4">
              <div>
                <label htmlFor="code" className="sr-only">
                  Verification Code
                </label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter verification code"
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="input-field min-w-[20px] rounded-lg px-4 py-6 text-base placeholder:text-[#a8a8a8]"
                  autoComplete="off"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                disabled={!code}
                size="lg"
                className="w-full"
              >
                {isLoading ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  "Done"
                )}
              </Button>
            </form>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleVerification(code)}
              disabled={isLoading}
            >
              Resend Reset Instructions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
