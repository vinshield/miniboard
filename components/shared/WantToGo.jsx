"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useRef, useState, useEffect, useId } from "react";
import AddToCalendar from "./AddToCalendar";
import { ArrowBigLeft, ArrowLeft, CalendarCheck } from "lucide-react";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

export default function WantToGo({ event }) {
  const uniqueId = useId();
  const formContainerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState(null);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setNote(null);
  };

  useClickOutside(formContainerRef, () => {
    closeMenu();
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="flex items-center justify-center">
        <motion.button
          key="button"
          layoutId={`popover-${uniqueId}`}
          onClick={openMenu}
        >
          <motion.span layoutId={`popover-label-${uniqueId}`}>
            <div className="mr-2 flex items-center justify-center rounded-lg bg-[#f5f5f5] p-2">
              <CalendarCheck className="h-[14px] w-[14px] text-gray-700" />{" "}
              <span className="ml-1 text-xs">I want to go</span>
            </div>
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <div className="flex-center">
              <motion.div
                ref={formContainerRef}
                layoutId={`popover-${uniqueId}`}
                className="absolute bottom-0 left-0 right-0 top-0 m-0.5 overflow-hidden rounded-lg border border-zinc-950/10 bg-white outline-none dark:bg-zinc-700 sm:mx-3 sm:my-3"
              >
                <ArrowLeft
                  size={16}
                  className="absolute left-4 top-4 text-zinc-900 dark:text-zinc-100"
                  onClick={closeMenu}
                />
                <div className="p-3">
                  <h3
                    className={`text-center text-lg font-semibold tracking-tighter sm:text-xl ${!event || event.numOfSaves < 4 ? "mb-2" : ""}`}
                  >
                    Add to your calendar
                  </h3>
                  <AddToCalendar eventData={event} size={2} />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
