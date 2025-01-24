"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import EventForm from "@/components/shared/EventForm";

import { BadgeX, CalendarPlus, LogIn } from "lucide-react";
import SuccessPage from "@/components/shared/SuccessPage";

import { getEventByPublicId } from "@/lib/actions/event.actions";
import { Button } from "@/components/ui/button";

const UpdateEvent = ({ params }) => {
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
  const [isOwner, setIsOwner] = useState(null);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const getEvent = async () => {
      try {
        const eventData = await getEventByPublicId(params.id);
        setEvent(eventData);
        console.log(eventData.organizerClerkId, user.id);
        if (eventData.organizerClerkId === user.id) {
          setIsOwner(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getEvent();
  }, [params.id]);

  const showSuccessMessage = (event) => {
    setEvent(event);
    setStatus("success");
  };
  return (
    <>
      {status === "begin" && (
        <div className="pb-24">
          <div className="container flex items-center justify-center">
            <CalendarPlus size={40} className="mr-1 text-gray-400" />
            <h1 className="my-12 text-3xl font-semibold text-gray-400">Edit</h1>
          </div>

          {event &&
            (isOwner ? (
              <EventForm
                type="update"
                event={event}
                onSuccess={showSuccessMessage}
              />
            ) : (
              <div className="flex-center h-[50vh]">
                <div className="flex-center container flex-col gap-2">
                  <BadgeX
                    strokeWidth={1.5}
                    absoluteStrokeWidth={true}
                    className="text size-2/5 text-[#a8a8a8]"
                  />
                  <p className="text-base font-semibold text-[#6b7280]">
                    Not Authorized
                  </p>
                  <p className="px-4 text-center text-sm text-[#a8a8a8]">
                    Only the event creator can edit this event
                  </p>
                  <Button
                    onClick={() => router.push("/signin")}
                    className="mt-4 shadow-lg"
                    variant="test"
                  >
                    <LogIn size={20} className="mr-2" />
                    Sign in
                  </Button>
                </div>{" "}
              </div>
            ))}
        </div>
      )}
      {status === "success" && (
        <div className="flex h-[60vh] flex-col justify-center">
          <SuccessPage event={event} type="update" />
        </div>
      )}
    </>
  );
};

export default UpdateEvent;
