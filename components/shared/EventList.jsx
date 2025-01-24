"use client";
import React, { createContext, useState, useContext } from "react";
import { useRouter } from "next/navigation";

import { useUser as clerkUser } from "@clerk/clerk-react";
import EventCard from "./EventCard";
import { CalendarPlus } from "lucide-react";

const EventList = ({ organizersEvents, creator }) => {
  const router = useRouter();
  const UserContext = createContext();
  const { user } = clerkUser();

  const [isOwner, setIsOwner] = useState();

  const UserProvider = ({ children }) => {
    if (user?.id === creator.id) {
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
        {/* <h2 className="container my-4 -mb-4 text-lg font-semibold">
          Upcoming Events
        </h2> */}

        {/* <div className="container">
          <div className="flex overflow-hidden rounded-md border border-secondary text-center">
            <div className="w-1/2 rounded-md bg-primary text-white">Events</div>
            <div className="w-1/2 bg-white">Blogs</div>
          </div>
        </div> */}

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
              <p className="select-none text-xl font-medium tracking-tighter text-gray-400">
                Create {organizersEvents.length < 1 ? "your first" : "new"}{" "}
                event
              </p>
            </div>
          </div>
        )}
        {organizersEvents.map((event) => (
          <EventCard
            key={event._id}
            isOwner={isOwner}
            event={event}
            creator={creator}
          />
        ))}
      </div>
    </UserProvider>
  );
};

export default EventList;
