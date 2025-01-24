"use client";
import React, { useRef, useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useUser } from "@clerk/clerk-react";
import {
  Share2,
  CalendarCheck,
  MapPin,
  Video,
  CalendarDays,
  PencilLine,
} from "lucide-react";
import { default as ShareIcon2 } from "@/public/assets/icons/share.svg";
import { default as ShareIcon } from "@/public/assets/icons/share-from-square.svg";
import { formatDateTime, formatDateTimeForSharing } from "@/lib/utils";

import Image from "next/image";
import WantToGo from "./WantToGo";
import { deleteEvent } from "@/lib/actions/event.actions";
import Link from "next/link";

import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogContainer,
} from "@/components/ui/morphing-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddToCalendar from "./AddToCalendar";
import ReusableShare from "./ReusableShare";
import { Button } from "../ui/button";
import { getUserById } from "@/lib/actions/user.actions";
import { getUserByClerkId } from "@/lib/actions/clerk.actions";

const EventCard = ({ event, isOwner }) => {
  const [creator, setCreator] = useState(null);
  const router = useRouter();

  const { organizerClerkId } = event;

  const { user } = useUser();

  useEffect(() => {
    const getCreator = async () => {
      const creatorDetails = await getUserByClerkId(organizerClerkId);
      setCreator(creatorDetails);
    };

    getCreator();
  }, [organizerClerkId]);

  const handleShare = () => {
    if (navigator.share) {
      // Use Web Share API
      navigator
        .share({
          title: event.title,
          text: `${event.title} on ${formatDateTimeForSharing(event.startDateTime).dateWithoutYear} at ${event.location}.`,
          url: `https://miniboard.site/e/${event.publicId}`,
        })
        .then(() => console.log("Share successful"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback: Copy to clipboard or alert the user
      navigator.clipboard
        .writeText(
          `Check out this event: ${event.title} on ${formatDateTimeForSharing(event.startDateTime).dateWithoutYear} at ${event.location}.\n\nSet a reminder stress-free https://miniboard.site/e/${event.publicId}`,
        )
        .then(() => alert("Link copied to clipboard!"))
        .catch((error) => console.error("Error copying to clipboard:", error));
    }
  };
  return (
    <MorphingDialog
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 24,
      }}
    >
      <div className="container relative">
        <div className="mx-auto my-6 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <div className="relative flex gap-2 p-4">
            <div className="flex-1 overflow-hidden">
              <MorphingDialogTrigger>
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
              </MorphingDialogTrigger>
              <div className="flex items-center pt-5">
                <div
                  className="mr-2 flex items-center justify-center rounded-full bg-[#f5f5f5] p-3"
                  onClick={() => handleShare()}
                >
                  <Share2 className="h-4 w-4 text-gray-700" />
                </div>

                <WantToGo event={event} />
              </div>
            </div>
            <div className="h-40 w-24">
              <MorphingDialogImage
                src={event.imageUrl}
                alt={event.title}
                width={100}
                height={100}
                className="aspect-square w-24 rounded-lg bg-gray-800 object-cover"
              />
            </div>{" "}
          </div>
        </div>
      </div>
      <MorphingDialogContainer>
        <MorphingDialogContent
          style={{
            borderRadius: "12px",
          }}
          className="relative h-auto w-[500px] border border-gray-100 bg-white"
        >
          <ScrollArea className="h-[90vh]" type="scroll">
            <div className="relative p-6 pb-10">
              <div className="flex justify-center py-10">
                <MorphingDialogImage
                  className="h-auto w-[200px] rounded-lg"
                  src={event.imageUrl}
                  alt={event.title}
                  width={100}
                  height={100}
                />
              </div>

              <div>
                <div className="flex flex-col gap-8">
                  <div>
                    <MorphingDialogTitle className="text-2xl font-bold">
                      {event.title}
                    </MorphingDialogTitle>
                    {creator && (
                      <MorphingDialogSubtitle className="my-2 flex gap-1 font-light text-gray-600">
                        <div className="relative h-6 w-6">
                          <Image
                            src={creator?.imageUrl}
                            alt={creator?.publicMetadata?.displayName}
                            className="rounded-sm"
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        {creator?.publicMetadata?.displayName}
                      </MorphingDialogSubtitle>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <CalendarDays
                        className="m-0 p-0 text-gray-400"
                        size={36}
                      />
                      <div className="text-sm">
                        <p>
                          {
                            formatDateTimeForSharing(event.startDateTime)
                              .dateOnly
                          }
                        </p>
                        <p className="text-gray-600">
                          {
                            formatDateTimeForSharing(event.startDateTime)
                              .timeOnly
                          }{" "}
                          -{" "}
                          {formatDateTimeForSharing(event.endDateTime).timeOnly}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {event.isOnline ? (
                        <div className="rounded-lg border border-gray-400 p-1">
                          <Video className="mr-1 text-gray-400" size={26} />{" "}
                        </div>
                      ) : (
                        <div className="rounded-lg border border-gray-400 p-1">
                          <MapPin className="text-gray-400" size={26} />
                        </div>
                      )}
                      <p className="line-clamp-1 overflow-ellipsis text-sm">
                        {event.isOnline ? "Online" : event.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm leading-relaxed text-gray-700">
                    <p>{event.description}</p>
                  </div>
                  <div className="flex flex-col gap-4 rounded-lg border border-gray-200/60 px-2 py-4">
                    <div className="flex flex-col gap-1 pl-2">
                      <h3 className="text-sm font-semibold text-gray-600">
                        Add to your calendar
                      </h3>
                      <p className="text-xs text-gray-500">
                        We&apos;ll send you a reminder 30 minutes before the
                        event starts.
                      </p>
                    </div>
                    <AddToCalendar eventData={event} size={2} />
                  </div>
                  {event.numOfSaves > 2 && (
                    <p className="-mt-6 text-xs text-gray-500">
                      <strong className="text-gray-600">
                        {event.numOfSaves}
                      </strong>{" "}
                      people have set a reminder for this event.
                    </p>
                  )}
                  <div className="w-full bg-slate-50">
                    <div className="px-2">
                      <ReusableShare event={event} />
                    </div>
                  </div>
                  {isOwner && (
                    <Button
                      onClick={() => router.push(`/e/${event.publicId}/update`)}
                      className="my-4 w-full rounded-lg text-sm"
                    >
                      <PencilLine className="mr-1" />
                      Edit Event
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
          <MorphingDialogClose className="text-zinc-500" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
};

export default EventCard;
