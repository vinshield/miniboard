import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export function SignUpPage2() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <SignUp
        path="/signup"
        routing="path"
        signInUrl="/signin"
        // redirectUrl="/complete-profile"
        username={username}
        appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-md",
            card: " bg-transparent rounded-lg shadow-none border-none",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
          },
        }}
      />
    </div>
  );
}
