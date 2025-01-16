"use client";
import React, { createContext, useState, useContext } from "react";
import { useRouter } from "next/navigation";

import { useUser as clerkUser } from "@clerk/clerk-react";

import EventCard from "./EventCard";
import { CalendarPlus } from "lucide-react";

const EventList = ({ organizersEvents, creatorId }) => {
  const router = useRouter();
  const UserContext = createContext();

  const [isOwner, setIsOwner] = useState();

  const UserProvider = ({ children }) => {
    const { user } = clerkUser();

    if (user?.publicMetadata.userId === creatorId) {
      setIsOwner(true);
    }

    return (
      <UserContext.Provider value={{ isOwner }}>
        {children}
      </UserContext.Provider>
    );
  };

  const useUser = () => useContext(UserContext);

  return (
    <UserProvider>
      <div>
        <h2 className="container my-4 -mb-4 text-lg">Events</h2>

        {isOwner && (
          <div
            className="container my-6"
            onClick={() => router.push("/e/create")}
          >
            <div className="flex-center pon aspect-[8/3] w-full cursor-pointer overflow-hidden rounded-lg border-2 border-dashed focus:bg-gray-200 active:bg-gray-200">
              <CalendarPlus
                className="mr-2 -rotate-2 text-gray-400"
                size={36}
              />
              <p className="leading-12 select-none text-xl font-semibold tracking-tighter text-gray-400">
                Create {!organizersEvents ? "your first" : "new"} event
              </p>
            </div>
          </div>
        )}
        {organizersEvents.data.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </UserProvider>
  );
};

export default EventList;
