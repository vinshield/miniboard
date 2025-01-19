"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import EventCard from "@/components/shared/EventCard";
import { formatDateTimeForSharing } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { default as WhatsappIcon } from "@/public/assets/icons/whatsapp.svg";
import { Copy, Check, CalendarCheck2 } from "lucide-react";

export const SuccessPage = ({ event, type }) => {
  const router = useRouter();
  const { user } = useUser();
  const username = user?.username;
  const [copied, setCopied] = useState(false);
  const { title, startDateTime, endDateTime, location, allDay, publicId } =
    event;
  const handleWhatsappShare = () => {
    const text =
      `*${title}*\n\n` +
      `📅 _${formatDateTimeForSharing(startDateTime).dateOnly}_\n` +
      `🕑 _${
        allDay
          ? "All day"
          : `${formatDateTimeForSharing(startDateTime).timeOnly}${
              endDateTime
                ? ` - ${formatDateTimeForSharing(endDateTime).timeOnly}`
                : ""
            }`
      }_\n` +
      `📍 _${location}_ \n\n` +
      `_Add to your calendar:_ https://miniboard.site/e/${publicId}/add`;

    const encodedText = encodeURIComponent(text);

    const whatsappURL = `whatsapp://send/?text=${encodedText}`;
    window.open(whatsappURL, "_blank");
  };

  const copyToClipboard = () => {
    const text = `https://miniboard.site/e/${publicId}/add`;
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <h2 className="container my-12 flex items-center gap-2 text-3xl font-semibold text-slate-500">
        Event {`${type}`}d successfully!
      </h2>
      <EventCard event={event} />
      <div className="container flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-500">Share:</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => copyToClipboard()}
            variant="ghost"
            className="m-0 flex cursor-pointer gap-0.5 px-1"
          >
            {copied ? (
              <Check className="-mr-1 size-6" />
            ) : (
              <Copy className="size-4" />
            )}
            <p className="text-sm">{copied ? "Copied!" : "Copy link"} </p>
          </Button>

          <Button
            variant="ghost"
            className="m-0 flex cursor-pointer gap-0.5 px-2"
            onClick={() => handleWhatsappShare()}
          >
            <WhatsappIcon className="size-4 fill-green-500" />
            <p className="text-sm">Whatsapp</p>
          </Button>
        </div>
      </div>
      <div className="container">
        <Button
          onClick={() => router.push(`/${username}`)}
          variant="test"
          className="ml-auto mt-12 flex w-2/5 gap-1 border shadow-md active:opacity-50"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
