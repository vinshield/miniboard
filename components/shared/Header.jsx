"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UserBio } from "./UserBio";
import { usePathname } from "next/navigation";

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
  const [signInVisible, setSignInVisible] = useState(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  let pathname = usePathname();
  console.log(pathname);
  useEffect(() => {
    setSignInVisible(true);
    if (pathname === "/sign-up") setSignInVisible(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={`transition-translate fixed left-0 right-0 top-0 z-10 h-16 bg-gradient-to-b from-sky-200 via-slate-50 via-90% to-white duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container w-full py-3">
        <nav className="flex w-full items-center justify-between">
          <Link href="/" className="text-base font-bold text-[#757b85]">
            miniboard
          </Link>

          <div className={`${!signInVisible ? "hidden" : ""}`}>
            <SignedOut>
              <div className="rounded-full bg-[#7480911a] px-4 py-2 text-sm font-semibold text-[#474b51] hover:bg-slate-400/40">
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
      </div>
    </header>
  );
};

export default Header;
