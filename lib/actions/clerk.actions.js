"use server";

import { createClerkClient } from "@clerk/backend";
import { auth } from "@clerk/nextjs/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const checkUsernameAvailability = async (username) => {
  if (!username || username.length < 4) {
    throw new Error("Username must be at least 4 characters long");
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

export const updateUserProfile = async ({
  bio,
  instagram,
  x,
  snapchat,
  tiktok,
}) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        bio,
        instagram,
        x,
        snapchat,
        tiktok,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, error: { message: error.message } };
  }
};
