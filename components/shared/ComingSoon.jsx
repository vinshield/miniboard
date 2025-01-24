"use client";
import React from "react";
import { Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";

const ComingSoon = ({ isOwner, creatorName }) => {
  return (
    <div className="flex-center h-[50vh]">
      <div className="flex-center container flex-col">
        <Hammer
          strokeWidth={1.5}
          absoluteStrokeWidth={true}
          className="text size-2/5 text-[#a8a8a8]"
        />
        <p className="mt-2 text-base font-semibold text-[#6b7280]">
          Coming soon{" "}
        </p>
        <p className="mt-2 px-4 text-center text-sm text-[#a8a8a8]">
          This feature is in development
        </p>
      </div>{" "}
    </div>
  );
};

export default ComingSoon;
