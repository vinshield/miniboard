"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Add({ searchParams }) {
  const { destination } = searchParams; // Get dynamic link from query params

  useEffect(() => {
    // Find the button or link by its ID or any other selector
    const button = document.getElementById("redirectButton");

    if (button) {
      // Simulate a click event
      button.click();
    }
  }, []);

  return null; // No need to render anything
}
