import React from "react";
import { auth } from "@clerk/nextjs/server";

import { getUserByUserNameForClient } from "@/lib/actions/clerk.actions";
import { getEventsByUser } from "@/lib/actions/event.actions";

import UserHeader from "@/components/shared/UserHeader";
import { MorphingDialogBasicTwo } from "@/components/shared/MorphingDialogBasicTwo";
import EventList from "@/components/shared/EventList";
import { TabsDemo } from "./TabsDemo";
import NoEvents from "./NoEvents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComingSoon from "@/components/shared/ComingSoon";
import Footer from "@/components/shared/Footer";
import { Skeleton } from "@/components/ui/skeleton";

const Page = async ({ params }) => {
  const { username } = params;
  const { sessionClaims } = await auth();
  const loggedInUserId = sessionClaims?.mongoDbId;

  let creatorInfo = await getUserByUserNameForClient(username);
  const creatorId = creatorInfo.publicMetadata.userMongoDbId;
  const creatorName = creatorInfo.publicMetadata.displayName;

  const isOwner = loggedInUserId === creatorId;

  let organizersEvents = await getEventsByUser({ userId: creatorId, page: 1 });
  organizersEvents = organizersEvents.data;

  return (
    <div>
      <div className="container my-5 flex flex-col items-start space-y-5">
        {/* Profile Header */}
        <div className="flex flex-col gap-5">
          {/* Profile Image Skeleton */}
          <Skeleton className="h-[6.5rem] w-[6.5rem] rounded-full" />

          {/* User Name Skeleton */}
          <Skeleton className="h-6 w-40 rounded-lg" />
        </div>

        {/* Bio Skeleton */}
        <Skeleton className="h-16 w-4/5 rounded-lg" />

        {/* Social Handles Skeleton */}
        <div className="flex space-x-3">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
        </div>
      </div>

      {/* Skeletons for Event Cards */}
      <div className="container mt-8 space-y-4">
        {[1, 2].map((index) => (
          <div key={index} className="flex overflow-hidden rounded-lg">
            <div>
              <Skeleton className="h-5 w-32 rounded" /> {/* Event title */}
              <Skeleton className="mt-2 h-4 w-24 rounded" /> {/* Date */}
            </div>
            <div>
              <Skeleton className="mt-4 h-full w-full rounded" />{" "}
            </div>
          </div>
        ))}
      </div>

      <UserHeader user={creatorInfo} />
      <Tabs defaultValue="events">
        <div className="container">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="events">
          {organizersEvents.length > 0 ? (
            <EventList
              organizersEvents={organizersEvents}
              creator={creatorInfo}
            />
          ) : (
            <NoEvents isOwner={isOwner} creatorName={creatorName} />
          )}
        </TabsContent>
        <TabsContent value="blogs">
          <ComingSoon />
        </TabsContent>
      </Tabs>
      <Footer />
    </div>
  );
};

export default Page;
