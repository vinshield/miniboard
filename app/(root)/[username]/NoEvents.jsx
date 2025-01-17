"use client";
import React from "react";
import { Binoculars, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const NoEvents = ({ isOwner, creatorName }) => {
  return (
    <div className="flex-center h-[50vh]">
      <div className="flex-center container flex-col">
        <Binoculars className="text size-1/2 text-[#a8a8a8]" />
        <p className="text-lg font-semibold text-[#6b7280]">
          Nothing to see here{" "}
        </p>
        <p className="mt-1 text-[#a8a8a8]">
          {isOwner
            ? "You have no upcoming events"
            : `${creatorName} has no upcoming events`}
        </p>
        {isOwner && (
          <Button
            onClick={() => (window.location.href = "/e/create")}
            variant="outline"
            className="mt-6 flex gap-1 border border-black bg-[#e7e7e7] px-4 py-6 text-[#7d7c7c] active:opacity-50"
          >
            <CalendarPlus />
            Create New Event
          </Button>
        )}
      </div>{" "}
    </div>
  );
};

export default NoEvents;
