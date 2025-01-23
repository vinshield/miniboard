"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import EventCard from "@/components/shared/EventCard";
import ReusableShare from "./ReusableShare";
import { Button } from "../ui/button";

export const SuccessPage = ({ event, type }) => {
  const router = useRouter();
  const { user } = useUser();
  const username = user?.username;

  return (
    <div>
      <h2 className="container my-12 flex items-center gap-2 text-3xl font-semibold text-slate-500">
        Event {`${type}`}d successfully!
      </h2>
      <EventCard event={event} creator={user} />
      <div className="container">
        <ReusableShare event={event} />
      </div>
      <div className="container mt-8 text-right">
        <Button
          onClick={() => router.push(`/${username}`)}
          variant="test"
          className="w-2/5"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
