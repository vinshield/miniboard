"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import EventCard from "@/components/shared/EventCard";
import ReusableShare from "./ReusableShare";

export const SuccessPage = ({ event, type }) => {
  const router = useRouter();
  const { user } = useUser();
  const username = user?.username;

  return (
    <div>
      <h2 className="container my-12 flex items-center gap-2 text-3xl font-semibold text-slate-500">
        Event {`${type}`}d successfully!
      </h2>
      <EventCard event={event} />
      <ReusableShare />
    </div>
  );
};

export default SuccessPage;
