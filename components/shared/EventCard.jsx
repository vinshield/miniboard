"use client";
import React, { useRef } from "react";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Share2, CalendarCheck, MapPin, Video } from "lucide-react";
import { default as ShareIcon2 } from "@/public/assets/icons/share.svg";
import { default as ShareIcon } from "@/public/assets/icons/share-from-square.svg";
import { formatDateTime } from "@/lib/utils";

import Image from "next/image";
import WantToGo from "./WantToGo";
import { deleteEvent } from "@/lib/actions/event.actions";

const EventCard = ({ event }) => {
  const { user } = useUser();
  console.log(user);
  const wantToGoRef = useRef();

  const handleShare = () => {
    if (navigator.share) {
      // Use Web Share API
      navigator
        .share({
          title: event.title,
          text: `${event.title} at ${event.location}.`,
          url: window.location.href, // You can customize this URL as needed
        })
        .then(() => console.log("Share successful"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback: Copy to clipboard or alert the user
      navigator.clipboard
        .writeText(
          `Check out this event: ${event.title} at ${event.location}. ${window.location.href}`,
        )
        .then(() => alert("Link copied to clipboard!"))
        .catch((error) => console.error("Error copying to clipboard:", error));
    }
  };
  return (
    <div className="container relative">
      <div className="mx-auto my-6 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <div className="relative flex gap-2 p-4">
          <div className="flex-1 overflow-hidden">
            <p className="mb-2 text-sm uppercase text-gray-500">
              {formatDateTime(event.startDateTime).dateOnly} |{" "}
              {formatDateTime(event.startDateTime).timeOnly}
            </p>
            <h2 className="mb-2 line-clamp-3 font-semibold leading-snug text-gray-800">
              {event.title}
            </h2>
            <div className="mb-6 flex items-center">
              {event.isOnline ? (
                <div>
                  <Video className="mr-1 text-gray-700" size={16} />{" "}
                </div>
              ) : (
                <div>
                  <MapPin className="mr-1 text-gray-700" size={16} />
                </div>
              )}
              <p className="line-clamp-1 overflow-ellipsis text-xs text-gray-600">
                {event.isOnline ? "Online" : event.location}
              </p>
            </div>
            <div className="flex items-center pt-5">
              <div
                className="mr-2 flex items-center justify-center rounded-full bg-[#f5f5f5] p-3"
                onClick={() => handleShare()}
              >
                <Share2 className="h-4 w-4 text-gray-700" />
              </div>

              <WantToGo event={event} />
            </div>
            <button
              onClick={() =>
                deleteEvent({ eventId: event._id, path: `/${event.publicId}` })
              }
            >
              delete
            </button>
          </div>

          <div className="h-40 w-24">
            <Image
              src={event.imageUrl}
              alt={event.title}
              width={100}
              height={100}
              className="h-40 w-24 rounded-lg bg-gray-800 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
