"use server";

import { socialHandles } from "@/constants";
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

//GET USER BY CLERKID
export const getUserByClerkId = async (clerkId) => {
  if (!clerkId) {
    throw new Error("No Clerk ID provided");
  }
  try {
    const user = await clerkClient.users.getUser(clerkId);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log("Error fetching user by clerkId:", error);
    throw new Error("Failed to fetch user by clerkId");
  }
};

export const getUserByUserNameForClient = async (username) => {
  try {
    const users = await clerkClient.users.getUserList({
      username: [username],
    });
    const userInfo = users.data[0];
    const user = {
      imageUrl: userInfo.imageUrl,
      publicMetadata: userInfo.publicMetadata,
      id: userInfo.id,
    };
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw new Error("Failed to fetch user by username");
  }
};

export const updateUserProfile = async ({
  username,
  displayName,
  bio,
  instagram,
  x,
  tiktok,
  snapchat,
}) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Handle username update separately since it's a different API call
  if (username) {
    try {
      await clerkClient.users.updateUser(userId, {
        username,
      });
    } catch (error) {
      console.error("Error updating username:", error);
      return { success: false, error: error.message };
    }
  }

  // Handle profile metadata update if any profile fields are provided
  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        bio,
        displayName,
        socialHandles: {
          instagram,
          x,
          tiktok,
          snapchat,
        },
      },
    });
  } catch (error) {
    console.error("Error updating profile metadata:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
};
