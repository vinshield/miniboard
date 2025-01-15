import EventForm from "@/components/shared/EventForm";
import Header from "@/components/shared/Header";
import React from "react";

import { CalendarPlus } from "lucide-react";

const CreateEvent = () => {
  return (
    <>
      <Header />
      <div className="container flex items-center justify-center">
        <CalendarPlus size={40} className="mr-1 text-gray-400" />
        <h1 className="my-12 text-3xl font-semibold text-gray-400">
          Create Event
        </h1>
      </div>
      <EventForm type={"Create"} />
    </>
  );
};

export default CreateEvent;
