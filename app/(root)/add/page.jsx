"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    // Find the button or link by its ID or any other selector
    const button = document.getElementById("redirectButton");

    if (button) {
      // Simulate a click event
      setTimeout(() => {
        button.click();
      }, 2000);
    }
  }, []);

  return (
    <div>
      <h1>This page will redirect soon...</h1>
      {/* Hidden button or link */}
      <a
        id="redirectButton"
        href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Movie%20Night%3A%20Guardians%20of%20the%20Galaxy%20%F0%9F%8E%AC&dates=20240928T183000/20240928T200000&ctz=Africa/Lagos&location=PTCF&details=Come%20and%20have%20a%20good%20time&reminder=30,60"
        style={{ display: "none" }}
      >
        Redirect
      </a>
    </div>
  );
}
