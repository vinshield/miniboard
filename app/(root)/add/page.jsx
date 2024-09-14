// app/your-route/page.js
import { redirect } from "next/navigation";

export default function Add({ searchParams }) {
  const { destination } = searchParams; // Get dynamic link from query params

  const link =
    destination ||
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Movie%20Night%3A%20Guardians%20of%20the%20Galaxy%20%F0%9F%8E%AC&dates=20240928T183000/20240928T200000&ctz=Africa/Lagos&location=PTCF&details=Come%20and%20have%20a%20good%20time&reminder=30,60"; // Fallback to a default link if no query param

  redirect(link);
}
