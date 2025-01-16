import React from "react";

import { getUserByUserNameForClient } from "@/lib/actions/clerk.actions";
import { getEventsByUser } from "@/lib/actions/event.actions";

import UserHeader from "@/components/shared/UserHeader";
import EventList from "@/components/shared/EventList";
import { TabsDemo } from "./TabsDemo";

const Page = async ({ params }) => {
  const { username } = params;

  let userInfo = await getUserByUserNameForClient(username);
  const creatorId = userInfo.publicMetadata.userId;
  let organizersEvents = await getEventsByUser({ userId: creatorId, page: 1 });

  if (!params) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserHeader user={userInfo} />
      <EventList organizersEvents={organizersEvents} creatorId={creatorId} />
    </div>
  );
};

export default Page;
