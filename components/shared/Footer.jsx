import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { TextShimmer } from "../ui/text-shimmer";

const Footer = () => {
  return (
    <div className="flex-center container mt-16 flex flex-col bg-slate-100 pb-12 pt-12">
      <Link asChild href="/signup">
        <Button
          variant="outline"
          className="border border-sky-400 py-5 text-sm shadow-md"
        >
          <TextShimmer duration={2}>Create your miniboard</TextShimmer>
        </Button>
      </Link>

      <p className="mt-4 text-sm text-[#5a5e65]">
        Built by{" "}
        <Link className="cursor-pointer underline underline-offset-4" href="/">
          miniboard
        </Link>
      </p>
    </div>
  );
};

export default Footer;
