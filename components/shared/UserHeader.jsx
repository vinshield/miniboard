"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import Image from "next/image";

import { socialHandles } from "@/constants";
import Link from "next/link";

//Get username from URL (frontend)
//Get userId and bio info from username (backend)
//Get events from userId

const UserHeader = ({ user }) => {
  const [socialHandlesPresent, setSocialHandlesPresent] = useState(false);
  const userSocialHandles = user.publicMetadata.socialHandles;

  if (
    Object.values(userSocialHandles).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value != "" &&
        !(typeof value === number && isNaN(value)),
    )
  ) {
    setSocialHandlesPresent(true);
  }

  return (
    <div className="container my-5 flex flex-col items-start space-y-5">
      <div className="flex flex-col gap-5">
        <div className="relative h-[6.5rem] w-[6.5rem] rounded-[100%] bg-[#333]">
          <Image
            src={user?.imageUrl}
            alt={user?.publicMetadata?.displayName}
            className="rounded-[100%]"
            width={500}
            height={500}
            // layout="fill"
            // objectFit="cover"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-black">
          {user?.publicMetadata?.displayName}
        </h1>
      </div>
      {user?.publicMetadata?.bio && (
        <p className="text-sm leading-5 text-gray-500">
          {user.publicMetadata.bio}
        </p>
      )}
      {socialHandlesPresent && (
        <div>
          {socialHandles.map((handle) => {
            if (user?.publicMetadata?.socialHandles?.[handle.name]) {
              let profileUrl;

              switch (handle.name) {
                case "tiktok":
                  profileUrl = `https://www.tiktok.com/@${user.publicMetadata?.socialHandles?.[handle.name]}`;
                  break;
                case "snapchat":
                  profileUrl = `https://www.snapchat.com/add/${user.publicMetadata?.socialHandles?.[handle.name]}`;
                  break;
                default:
                  profileUrl = `https://www.${handle.name}.com/${user.publicMetadata?.socialHandles?.[handle.name]}`;
                  break;
              }

              return (
                <Link href={profileUrl} target="_blank" key={handle.name}>
                  <i className={`ci ci-${handle.name} mr-3`}></i>
                </Link>
              );
            }
          })}
        </div>
      )}

      {/* Different types of horizontal lines: */}
      {/* <div class="h-px w-full bg-gray-200 shadow-sm"></div> */}
      {/* <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent shadow-sm"></div> */}
      {/* <div class="relative w-full">
        <hr class="border-t border-gray-300" />
        <div class="absolute inset-x-0 -bottom-1 h-2 bg-gradient-to-b from-gray-300 to-transparent opacity-50 blur-sm"></div>
      </div> */}

      {/* <div className="my-4 w-full border-t border-gray-300 shadow-md"></div> */}
    </div>
  );
};

export default UserHeader;
