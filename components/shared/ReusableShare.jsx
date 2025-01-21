import React, { useState } from "react";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";
import { default as WhatsappIcon } from "@/public/assets/icons/whatsapp.svg";

import { formatDateTimeForSharing } from "@/lib/utils";

const ReusableShare = ({ event }) => {
  const [copied, setCopied] = useState(null);
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
      `_Set a reminder stress-free_👉🏽 https://miniboard.site/e/${publicId}/add`;

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
    <div className="flex items-center justify-between">
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
  );
};

export default ReusableShare;
