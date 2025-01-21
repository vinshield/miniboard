import React from "react";
import { auth } from "@clerk/nextjs/server";

import { getUserByUserNameForClient } from "@/lib/actions/clerk.actions";
import { getEventsByUser } from "@/lib/actions/event.actions";

import UserHeader from "@/components/shared/UserHeader";
import { MorphingDialogBasicTwo } from "@/components/shared/MorphingDialogBasicTwo";
import EventList from "@/components/shared/EventList";
import { TabsDemo } from "./TabsDemo";
import NoEvents from "./NoEvents";

const Page = async ({ params }) => {
  const { username } = params;
  const { sessionClaims } = await auth();
  const loggedInUserId = sessionClaims?.mongoDbId;

  let creatorInfo = await getUserByUserNameForClient(username);
  const creatorId = creatorInfo.publicMetadata.userId;
  const creatorName = creatorInfo.publicMetadata.displayName;

  const isOwner = loggedInUserId === creatorId;

  let organizersEvents = await getEventsByUser({ userId: creatorId, page: 1 });
  organizersEvents = organizersEvents.data;

  if (!params) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserHeader user={creatorInfo} />
      <MorphingDialogBasicTwo />
      {organizersEvents.length > 0 ? (
        <EventList organizersEvents={organizersEvents} creator={creatorInfo} />
      ) : (
        <NoEvents isOwner={isOwner} creatorName={creatorName} />
      )}
    </div>
  );
};

export default Page;
