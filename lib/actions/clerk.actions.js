"use server";

import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const checkUsernameAvailability = async (username) => {
  if (!username || username.length < 3) {
    throw new Error("Username must be at least 3 characters long");
  }

  try {
    const users = await clerkClient.users.getUserList({
      username: [username],
    });
    return users.totalCount === 0;
  } catch (error) {
    console.error("Error checking username availability:", error);
    throw new Error("Failed to check username availability");
  }
};
