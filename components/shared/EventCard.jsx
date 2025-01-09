"use client";
import React from "react";
import { Share2, CalendarCheck, MapPin } from "lucide-react";
import { default as ShareIcon2 } from "@/public/assets/icons/share.svg";
import { default as ShareIcon } from "@/public/assets/icons/share-from-square.svg";
import { formatDateTime } from "@/lib/utils";

import Image from "next/image";
import { WantToGo } from "./WantToGo";

const EventCard = ({ event }) => {
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
    <div className="container">
      <div className="mx-auto my-6 max-w-sm overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <div className="flex p-4">
          <div className="mr-2 flex-1 overflow-hidden">
            <p className="mb-2 text-sm uppercase text-gray-500">
              {formatDateTime(event.startDateTime).dateTime}
            </p>
            <h2 className="mb-2 line-clamp-3 font-semibold leading-snug text-gray-800">
              {event.title}
            </h2>
            <div className="mb-6 flex items-center text-xs text-gray-600">
              <MapPin className="mr-1 h-5 w-5 text-gray-700" />
              <p className="line-clamp-1">{event.location}</p>
            </div>
            <div className="flex items-center">
              <div
                className="mr-2 flex items-center justify-center rounded-full bg-[#f5f5f5] p-3"
                onClick={() => handleShare()}
              >
                <Share2 className="h-4 w-4 text-gray-700" />
              </div>
              <div className="mr-2 flex items-center justify-center rounded-full bg-[#f5f5f5] p-3">
                <CalendarCheck className="h-4 w-4 text-gray-700" />{" "}
                <span className="ml-1 text-xs">I want to go</span>
                {/* <WantToGo eventData={event} /> */}
              </div>
              {/* <p className="text-sm italic">see details</p> */}
            </div>
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

// export default EventCard;

// import React from "react";
// import { Share, CalendarCheck, MapPin } from "lucide-react";

const EventCard2 = () => {
  return (
    <div className="mx-auto my-8 max-w-sm">
      <div className="flex rounded-lg bg-white p-4 shadow-md">
        <div className="flex flex-col">
          <span className="mb-2 text-sm text-gray-500">
            THUR OCT 4 | 7:30PM
          </span>
          <h2
            className="mb-4 text-lg font-semibold text-gray-800"
            style={{ letterSpacing: "-0.4px" }}
          >
            Hackoholics 5.0: Digitech Solutions for Africa’s Prosperity
          </h2>
          <div className="mb-4 flex items-center">
            <MapPin className="mr-2 text-black opacity-60" size={14} />
            <span className="text-sm text-black opacity-60">Owolabi Hall</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-gray-300">
              <Share2 className="text-gray-600" size={12} />
            </div>
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-gray-300">
              <CalendarCheck className="text-black opacity-60" size={12} />
            </div>
            <span className="text-sm italic text-black">see details</span>
          </div>
        </div>
        <div className="">
          <div
            className="h-40 w-24 rounded-lg bg-gray-800"
            style={{
              backgroundImage: `url('/assets/marvel 150.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
