import React from "react";

import { getUserByUserNameForClient } from "@/lib/actions/clerk.actions";
import { getEventsByUser } from "@/lib/actions/event.actions";

import UserHeader from "@/components/shared/UserHeader";
import EventList from "@/components/shared/EventList";

const page = async ({ params }) => {
  const { username } = params;

  let userInfo = await getUserByUserNameForClient(username);
  const userId = userInfo.publicMetadata.userId;
  let organizersEvents = await getEventsByUser({ userId, page: 1 });

  return (
    <div>
      <UserHeader user={userInfo} />
      <EventList organizersEvents={organizersEvents} />
    </div>
  );
};

export default page;
