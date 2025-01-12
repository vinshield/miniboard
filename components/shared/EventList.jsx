import React from "react";
import EventCard from "./EventCard";
import { getEventsByUser } from "@/lib/actions/event.actions";

const EventList = async ({ organizersEvents }) => {
  return (
    <div>
      {organizersEvents.data.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
