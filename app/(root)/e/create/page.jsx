"use client";
import React, { useState } from "react";

import EventForm from "@/components/shared/EventForm";

import { CalendarPlus } from "lucide-react";
import SuccessPage from "./SuccessPage";

const CreateEvent = () => {
  const testEvent = {
    title: "Ball Up 4.0 After Party",
    description:
      "Get ready for the ultimate pyjama after party at Ball Up 4.0! 🎉 Join us on the 20th of May for an unforgettable night with DJ Dimplenipple spinning the hottest tracks. Whether you're coming in your comfiest PJs or just ready to dance, this is a night you won't want to miss! Tickets are ₦1500 now and ₦2000 at the venue.",
    location: "Venue to be announced",
    startDateTime: "2024-05-19T23:00:00.000Z",
    endDateTime: "2024-05-19T23:00:00.000Z",
    isOnline: false,
    numOfSaves: 0,
    organizer: "677fb5001fcb9602b7b04121",
    imageUrl:
      "https://utfs.io/f/RX9hhmqvkN4FHjVXPD96Kd3BVvuTORGWbDaywAJSUP2iCcNx",
    _id: "6787ff51f1cfda278aa4ad2a",
    publicId: "gWn5NdMz",
    createdAt: "2025-01-15T18:32:49.228Z",
    __v: 0,
  };
  const [status, setStatus] = useState("begin");
  const [event, setEvent] = useState(null);
  const showSuccessMessage = (event) => {
    setEvent(event);
    setStatus("success");
    console.log(event);
  };
  return (
    <>
      {status === "begin" && (
        <>
          <div className="container flex items-center justify-center">
            <CalendarPlus size={40} className="mr-1 text-gray-400" />
            <h1 className="my-12 text-3xl font-semibold text-gray-400">
              Create Event
            </h1>
          </div>

          <EventForm type={"Create"} onSuccess={showSuccessMessage} />
        </>
      )}
      {status === "success" && (
        <div className="flex h-[60vh] flex-col justify-center">
          <SuccessPage event={event} />
        </div>
      )}
    </>
  );
};

export default CreateEvent;
