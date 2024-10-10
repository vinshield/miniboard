"use client";

import Header from "@/components/shared/Header";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { useRouter, usePathname } from "next/navigation";
import {
  getEventByPublicId,
  updateNumOfSaves,
} from "@/lib/actions/event.actions";
import { AddToCalendarSkeleton } from "@/components/ui/skeletons";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page({ params }) {
  const pathname = usePathname();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const eventData = await getEventByPublicId(params.id);
        if (eventData) {
          const start = DateTime.fromISO(eventData.startDateTime);
          const end = eventData.endDateTime
            ? DateTime.fromISO(eventData.endDateTime).toFormat("HH:mm")
            : "";

          setEvent({
            ...eventData,
            startDate: start.toFormat("yyyy-MM-dd"),
            startTime: start.toFormat("HH:mm"),
            endTime: end,
            isAllDay: !eventData.endDateTime ? true : false,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getEvent();
  }, [params.id]);

  const CalendarButton = (data) => {
    if (event.isAllDay) {
      return (
        <AddToCalendarButton
          name={event.title}
          options={["Apple", "Google", "iCal", "Microsoft365"]}
          location={event.location}
          startDate={event.startDate}
          description={`Visit [url]https://miniboard-flax.vercel.app[/url] for more information.\n\n${event.description}`}
          timeZone="Africa/Lagos"
          buttonsList
          images={[
            "https://firebasestorage.googleapis.com/v0/b/wknd-47e66.appspot.com/o/event-posters%2FMovie%20-%20ac23e24a-d4a5-4aa8-82ec-37cc0403b81e?alt=media&token=3fe092cc-9602-43fa-99b0-96fb2f6498c2",
          ]}
        />
      );
    }
    return (
      <AddToCalendarButton
        name={event.title}
        options={["Apple", "Google", "iCal", "Microsoft365"]}
        location={event.location}
        startDate={event.startDate}
        startTime={event.startTime}
        endTime={event.endTime || ""}
        description={`Visit [url]https://miniboard-flax.vercel.app[/url] for more information.\n\n${event.description}`}
        timeZone="Africa/Lagos"
        buttonsList
        images={[
          "https://firebasestorage.googleapis.com/v0/b/wknd-47e66.appspot.com/o/event-posters%2FMovie%20-%20ac23e24a-d4a5-4aa8-82ec-37cc0403b81e?alt=media&token=3fe092cc-9602-43fa-99b0-96fb2f6498c2",
        ]}
      />
    );
  };

  return (
    <>
      <Header />
      <div className="h-screen overflow-hidden">
        <div className="mb-[2.5rem] mt-36 flex flex-col items-center px-10 lg:container">
          <h1
            className={`leading-12 text-center text-3xl font-bold tracking-tighter md:text-7xl ${!event || event.numOfSaves < 4 ? "mb-6" : ""}`}
          >
            Choose your calendar
          </h1>
          <div className="flex-center relative">
            {!event ? (
              <AddToCalendarSkeleton />
            ) : (
              <div
                className="flex flex-col justify-center"
                onClick={() => updateNumOfSaves(event._id)}
              >
                {event.numOfSaves > 4 && (
                  <p className="mb-10 text-center text-sm text-muted-foreground">
                    <strong className="text-primary">{event.numOfSaves}</strong>{" "}
                    people have set a reminder for this event
                  </p>
                )}

                <div className="mb-20">
                  <CalendarButton data={event} />
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
