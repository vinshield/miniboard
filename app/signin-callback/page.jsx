"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
// import { auth } from "@clerk/nextjs/server";

export default function SSOCallback() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const username = user.username;
    router.push(`/${username}`);
  }, [user]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-2 text-xl">Signing in</h2>
        <div className="flex items-center gap-1">
          <p className="text-gray-600">Please wait</p>
          <LoaderCircle className="animate-spin text-blue-500" size={20} />
        </div>
      </div>
    </div>
  );
}
