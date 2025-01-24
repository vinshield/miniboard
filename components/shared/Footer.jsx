import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <div className="flex-center container mb-16 mt-16 flex flex-col">
      <div className="mb-12 w-full border-t border-gray-300 shadow-md"></div>
      <Link asChild href="/signup">
        <Button
          variant="outline"
          className="border border-sky-400 py-5 text-sm text-[#5b6169] shadow-md"
        >
          Create your
          <span className="font-bold">&nbsp;miniboard</span>
        </Button>
      </Link>
      <p className="mt-4 text-sm text-[#757b85]">
        Built by{" "}
        <Link className="cursor-pointer underline underline-offset-4" href="/">
          miniboard
        </Link>
      </p>
    </div>
  );
};

export default Footer;
