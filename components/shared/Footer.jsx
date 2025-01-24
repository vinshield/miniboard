"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { TextShimmer } from "../ui/text-shimmer";
import { useUser } from "@clerk/clerk-react";

const Footer = () => {
  const { user } = useUser();
  return (
    <div
      className={`flex-center container mt-16 flex flex-col bg-slate-100 ${!user ? "pt-16" : "pt-2"} pb-12`}
    >
      {!user && (
        <Link href="/signup">
          <Button
            variant="test"
            className="border border-sky-400 text-sm shadow-md"
          >
            <TextShimmer
              className="font-bold [--base-color:#fafafa] [--base-gradient-color:#38bdf8]"
              duration={1.1}
            >
              Create your miniboard
            </TextShimmer>
          </Button>
        </Link>
      )}

      <p className="mt-8 text-xs text-[#757b85]">
        Built by{" "}
        <Link className="cursor-pointer underline underline-offset-4" href="/">
          miniboard
        </Link>
      </p>
    </div>
  );
};

export default Footer;
