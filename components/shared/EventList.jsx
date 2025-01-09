import React from "react";
import EventCard from "./EventCard";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server";

const EventList = async () => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.mongoDbId;

  const organizersEvents = await getEventsByUser({ userId, page: 1 });

  return (
    <div>
      {organizersEvents.data.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
