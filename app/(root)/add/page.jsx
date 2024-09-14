"use client";

import Header from "@/components/shared/Header";
import { AddToCalendarButton } from "add-to-calendar-button-react";

export default function Page() {
  return (
    <>
      <Header />
      <div className="h-screen overflow-hidden">
        <div className="mb-[2.5rem] mt-36 flex flex-col items-center px-10 lg:container">
          <h1 className="leading-12 mb-4 text-center text-3xl font-bold tracking-tighter md:text-7xl">
            Choose your calendar
          </h1>
          <div className="flex-center">
            <AddToCalendarButton
              name="Movie Night: Guardians of the Galaxy 🎬"
              options={["Apple", "Google", "iCal", "Microsoft365"]}
              location="World Wide Web"
              startDate="2024-09-16"
              endDate="2024-09-16"
              startTime="10:15"
              endTime="23:30"
              timeZone="Africa/Lagos"
              buttonsList
            ></AddToCalendarButton>
          </div>
        </div>
      </div>
    </>
  );
}
