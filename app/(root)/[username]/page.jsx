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
      <UserHeader user={creatorInfo} />
      {/* <MorphingDialogBasicTwo /> */}
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
