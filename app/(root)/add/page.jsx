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
            {/* 
            Remember to add an image to this button for a nice appearance in the calendar

            Don't forget to include the link to this event's page in the description. Also add actual event description. Link to event page should come first
            */}
            <AddToCalendarButton
              images={[
                "https://firebasestorage.googleapis.com/v0/b/wknd-47e66.appspot.com/o/event-posters%2FMovie%20-%20ac23e24a-d4a5-4aa8-82ec-37cc0403b81e?alt=media&token=3fe092cc-9602-43fa-99b0-96fb2f6498c2",
              ]}
              description="[/p]Join the tech revolution at Hackaholics 5.0! Innovate, collaborate, and lead Africa towards a prosperous future 🌍🚀

              Visit [url]https://miniboard-flax.vercel.app[/url] for more information."
              name="Meta Idea: Digi Tech Solutions For Africa's Prosperity 👨🏽‍💻"
              options={["Apple", "Google", "iCal", "Microsoft365"]}
              location="Owolabi Hall, Afe Babalola University"
              startDate="2024-10-03"
              endDate="2024-10-04"
              startTime="09:00"
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
