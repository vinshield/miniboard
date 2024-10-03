"use client";

import Header from "@/components/shared/Header";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { useRouter, usePathname } from "next/navigation";

import { getEventByPublicId } from "@/lib/actions/event.actions";
import { updateNumOfSaves } from "@/lib/actions/event.actions";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page({ params }) {
  const pathname = usePathname();

  const [event, setEvent] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const getEvent = async () => {
      const eventData = await getEventByPublicId(params.id);
      setEvent(eventData);
      const luxonStartDate = DateTime.fromISO(eventData.startDateTime);
      const luxonEndDate = DateTime.fromISO(eventData.endDateTime);
      setStartDate(luxonStartDate.toFormat("yyyy-MM-dd"));
      setEndDate(luxonEndDate.toFormat("yyyy-MM-dd"));
      setStartTime(luxonStartDate.toFormat("HH:mm"));
      setEndTime(luxonEndDate.toFormat("HH:mm"));
      setDescription(eventData.description);
      setTitle(eventData.title);
      setLocation(eventData.location);
    };
    getEvent();
  }, []);

  return (
    <>
      <Header />
      <div className="h-screen overflow-hidden">
        <div className="mb-[2.5rem] mt-36 flex flex-col items-center px-10 lg:container">
          <h1 className="leading-12 text-center text-3xl font-bold tracking-tighter md:text-7xl">
            Choose your calendar
          </h1>
          <div className="flex-center">
            {/* 
            Remember to add an image to this button for a nice appearance in the calendar

            Don't forget to include the link to this event's page in the description. Also add actual event description. Link to event page should come first
            */}

            {event && (
              <div
                className="flex flex-col justify-center"
                onClick={() => {
                  updateNumOfSaves(event._id);
                }}
              >
                {event.numOfSaves > 4 && (
                  <p className="mb-10 text-center text-sm text-muted-foreground">
                    <strong className="text-primary">{event.numOfSaves}</strong>{" "}
                    people have set a reminder for this event
                  </p>
                )}

                <div className="mb-20">
                  <AddToCalendarButton
                    images={[
                      "https://firebasestorage.googleapis.com/v0/b/wknd-47e66.appspot.com/o/event-posters%2FMovie%20-%20ac23e24a-d4a5-4aa8-82ec-37cc0403b81e?alt=media&token=3fe092cc-9602-43fa-99b0-96fb2f6498c2",
                    ]}
                    description={`[/p]${description}\n\nVisit [url]https://miniboard-flax.vercel.app[/url] for more information.`}
                    name={title}
                    options={["Apple", "Google", "iCal", "Microsoft365"]}
                    location={location}
                    startDate={startDate}
                    endDate={endDate}
                    startTime={startTime}
                    endTime={endTime}
                    timeZone="Africa/Lagos"
                    buttonsList
                  ></AddToCalendarButton>
                </div>

                <Button className="mx-auto shadow-md">
                  <Link href="https://miniboard-flax.vercel.app/">
                    Visit the homepage 🚀
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
