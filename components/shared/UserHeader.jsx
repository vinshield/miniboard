"use client";

import React from "react";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";

import { socialHandles } from "@/constants";
import Link from "next/link";

const UserHeader = () => {
  const { user } = useUser();

  return (
    <div className="container mt-2 flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
      <div className="flex flex-row items-center gap-3">
        <div className="relative h-16 w-16 rounded-[100%] bg-[#333]">
          <Image
            src={user?.imageUrl}
            alt={user?.publicMetadata?.displayName}
            className="rounded-[100%]"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className="text-lg font-bold tracking-tight text-black">
          {user?.publicMetadata?.displayName}
        </h1>
      </div>
      <p className="text-sm text-gray-600">{user?.publicMetadata?.bio}</p>
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
      {/* <div class="h-px w-full bg-gray-200 shadow-sm"></div> */}
      <div class="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent shadow-sm"></div>
      {/* <div class="relative w-full">
        <hr class="border-t border-gray-300" />
        <div class="absolute inset-x-0 -bottom-1 h-2 bg-gradient-to-b from-gray-300 to-transparent opacity-50 blur-sm"></div>
      </div> */}

      {/* <div className="my-4 w-full border-t border-gray-300 shadow-md"></div> */}
    </div>
  );
};

export default UserHeader;
