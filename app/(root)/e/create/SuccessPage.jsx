"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import EventCard from "@/components/shared/EventCard";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { default as WhatsappIcon } from "@/public/assets/icons/whatsapp.svg";
import { Copy, Check, CalendarCheck2 } from "lucide-react";

export const SuccessPage = ({ event }) => {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const { title, startDateTime, endDateTime, location, allDay, publicId } =
    event;
  const handleWhatsappShare = () => {
    const text =
      `*${event.title}*\n\n` +
      `📅 _${formatDateTime(startDateTime).dateOnly}_\n` +
      `🕑 _${
        allDay
          ? "All day"
          : `${formatDateTime(startDateTime).timeOnly}${
              endDateTime ? ` - ${formatDateTime(endDateTime).timeOnly}` : ""
            }`
      }_\n` +
      `📍 _${location}_ \n\n` +
      `_Add to your calendar:_ https://miniboard.site/${publicId}/add`;

    const encodedText = encodeURIComponent(text);
    console.log({ text, encodedText });

    const whatsappURL = `whatsapp://send/?text=${encodedText}`;
    window.open(whatsappURL, "_blank");
  };

  const copyToClipboard = () => {
    const text = `https://miniboard.site/${publicId}/add`;
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <h2 className="container my-12 flex items-center gap-2 text-3xl font-semibold text-slate-500">
        {/* <CalendarCheck2 className="size-24 sm:size-8" /> */}
        Event created successfully!
      </h2>
      <EventCard event={event} />
      <div className="container flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-gray-500">Share:</p>
        </div>
        <div className="flex">
          <Button
            onClick={() => copyToClipboard()}
            variant="ghost"
            className="m-0 flex cursor-pointer gap-1"
          >
            {copied ? (
              <Check className="-mr-1 size-6" />
            ) : (
              <Copy className="size-5" />
            )}
            <p>{copied ? "Copied!" : "Copy link"} </p>
          </Button>

          <Button
            variant="ghost"
            className="m-0 flex cursor-pointer gap-1"
            onClick={() => handleWhatsappShare()}
          >
            <WhatsappIcon className="size-5 fill-green-500" />
            <p>Whatsapp</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
