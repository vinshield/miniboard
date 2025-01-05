"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { SocialInfo } from "./SocialInfo";
import { usePathname } from "next/navigation";
import { LogIn, Menu, X } from "lucide-react";

import { Button } from "../ui/button";

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
  const [showMenu, setShowMenu] = useState(false);

  const user = useUser();

  let pathname = usePathname();

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Clean up on unmount
    };
  }, [showMenu]); // Run effect when showMenu changes

  useEffect(() => {
    setSignInVisible(true);
    if (pathname === "/signup" || pathname === "/signin")
      setSignInVisible(false);
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
      className={`transition-translate fixed left-0 right-0 top-0 z-10 bg-gradient-to-b from-sky-200 via-slate-50 via-90% to-slate-50 duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container w-full py-3">
        <nav className="flex w-full items-center justify-between">
          <Link href="/" className="text-sm font-bold text-[#757b85]">
            miniboard
          </Link>

          <div className={`${!signInVisible ? "hidden" : ""}`}>
            {/* {showMenu ? ( */}
            <>
              {showMenu && (
                <div className="absolute left-0 top-0 h-screen w-[100vw] bg-gray-400/40 backdrop-blur-sm"></div>
              )}
              <div
                className={`absolute right-0 top-0 flex h-screen w-4/6 flex-col space-y-4 bg-white px-4 py-3 transition-transform duration-500 ease-in-out ${showMenu ? "translate-x-0" : "translate-x-full"}`}
              >
                <X
                  size={20}
                  className="ml-auto cursor-pointer"
                  onClick={() => setShowMenu(false)}
                />
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex w-full items-center gap-1 rounded-sm py-1 text-sm font-semibold text-[#474b51] hover:bg-slate-400/40">
                      {!user.isSignedIn && <LogIn size={16} />}
                      <SignedOut>
                        <SignInButton signUpUrl="/signup" />
                      </SignedOut>
                    </div>
                    <div className="flex items-center gap-2">
                      <SignedIn>
                        <UserButton showName="true">
                          <UserButton.UserProfilePage
                            label="My Info"
                            labelIcon={<DotIcon />}
                            url="terms"
                          >
                            <SocialInfo />
                          </UserButton.UserProfilePage>
                        </UserButton>
                      </SignedIn>
                    </div>
                  </div>
                  <div className="flex w-full justify-center">
                    <Button
                      variant="outline"
                      className="mb-28 border border-sky-400 py-6 text-sm text-[#5b6169] shadow-md"
                    >
                      <Link href="/signup">
                        Create your{" "}
                        <span className="font-bold">&nbsp;miniboard</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </>
            {!showMenu && <Menu size={20} onClick={() => setShowMenu(true)} />}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
