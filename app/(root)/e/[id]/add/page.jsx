"use client";

import { useUser } from "@clerk/clerk-react";
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
import EventCardLargeImg from "@/components/shared/EventCardLargeImg";
import { Skeleton } from "@/components/ui/skeleton";

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
          description={`${event.description}\n\nVisit [url]https://miniboard.site[/url] for more information.`}
          timeZone="Africa/Lagos"
          buttonsList
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
        description={`${event.description}\n\nVisit [url]https://miniboard.site[/url] for more information.`}
        timeZone="Africa/Lagos"
        buttonsList
      />
    );
  };

  return (
    <>
      <div className="h-screen overflow-hidden">
        <div className="mb-[2.5rem] mt-36 flex flex-col items-center">
          {!event ? (
            <div className="mt container my-6 space-y-6">
              {[1].map((index) => (
                <div
                  key={index}
                  className="flex gap-10 overflow-hidden rounded-lg border border-primary/10 p-4"
                >
                  <div className="flex-1">
                    <Skeleton className="h-6 w-full rounded-lg" />{" "}
                    {/* Event title */}
                    <Skeleton className="mt-2 h-6 w-32 rounded-lg" />{" "}
                    {/* Date */}
                  </div>
                  <div>
                    <Skeleton className="h-36 w-24 rounded-lg" />{" "}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EventCardLargeImg event={event} isOwner={false} />
          )}
          <div className="px-10 pt-8 lg:container">
            <h1
              className={`leading-12 text-center text-3xl font-bold tracking-tighter md:text-7xl ${!event || event.numOfSaves < 4 ? "mb-6" : ""}`}
            >
              Add to your calendar
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
                      <strong className="text-primary">
                        {event.numOfSaves}
                      </strong>{" "}
                      people have set a reminder for this event
                    </p>
                  )}

                  <div className="mb-20">
                    <CalendarButton data={event} />
                  </div>

                  <Button className="mx-auto shadow-md">
                    <Link href="https://miniboard.site/demo">
                      Visit demo page 🚀
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
