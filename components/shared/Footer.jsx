"use client";
import Link from "next/link";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import CreateMiniboardBtn from "./CreateMiniBoardBtn";

const Footer = () => {
  const { user } = useUser();
  return (
    <div
      className={`flex-center container mt-16 flex flex-col bg-slate-100 ${!user ? "pt-16" : "pt-2"} pb-12`}
    >
      {!user && <CreateMiniboardBtn />}

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
