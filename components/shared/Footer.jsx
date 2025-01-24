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
      className={`flex-center container mt-16 flex flex-col bg-slate-100 ${!user ? "pt-12" : ""} pb-12`}
    >
      {!user && (
        <Link href="/signup">
          <Button
            variant="outline"
            className="border border-sky-400 py-5 text-sm shadow-md"
          >
            <TextShimmer duration={2}>Create your miniboard</TextShimmer>
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
