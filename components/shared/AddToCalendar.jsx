"use client";

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

export default function AddToCalendar({ eventData, size }) {
  const [event, setEvent] = useState(null);
  // console.log(eventData);

  useEffect(() => {
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
  }, [eventData]);

  const CalendarButton = (data) => {
    if (data.isAllDay) {
      return (
        <AddToCalendarButton
          name={event.title}
          options={["Apple", "Google", "Microsoft365"]}
          location={event.location}
          startDate={event.startDate}
          description={`${event.description}\n\nVisit [url]https://miniboard-flax.vercel.app[/url] for more information.`}
          timeZone="Africa/Lagos"
          buttonsList
          size={size}
        />
      );
    }
    return (
      <AddToCalendarButton
        name={event.title}
        options={["Apple", "Google", "Microsoft365"]}
        location={event.location}
        startDate={event.startDate}
        startTime={event.startTime}
        endTime={event.endTime || ""}
        description={`${event.description}\n\nVisit [url]https://miniboard-flax.vercel.app[/url] for more information.`}
        timeZone="Africa/Lagos"
        buttonsList
        size={size}
      />
    );
  };

  return (
    <div className="flex flex-col items-center justify-center lg:container">
      <div className="flex-center">
        {!event ? (
          <AddToCalendarSkeleton />
        ) : (
          <div
            className="flex flex-col justify-center"
            onClick={() => updateNumOfSaves(event._id)}
          >
            {/* {event.numOfSaves > 4 && (
                    <p className="mb-10 text-center text-sm text-muted-foreground">
                      <strong className="text-primary">
                        {event.numOfSaves}
                      </strong>{" "}
                      people have set a reminder for this event
                    </p>
                  )} */}

            <div>
              <CalendarButton data={event} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
