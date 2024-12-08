"use client";
import Image from "next/image";
import Link from "next/link";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { UserBio } from "./UserBio";

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

const Header = () => {
  return (
    <header className="container w-full py-3">
      <nav className="flex w-full items-center justify-between">
        <Link href="/" className="text-base font-bold text-[#757b85]">
          miniboard
        </Link>

        <div>
          <SignedOut>
            <div className="rounded-full bg-[#7480911a] px-4 py-2 text-[#474b51] hover:bg-slate-400/40">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton>
              <UserButton.UserProfilePage
                label="Bio"
                labelIcon={<DotIcon />}
                url="terms"
              >
                <UserBio />
              </UserButton.UserProfilePage>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;

// rounded-full border-4 border-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] p-3
