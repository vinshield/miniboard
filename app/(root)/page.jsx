import EventCard from "@/components/shared/EventCard";
import EventForm from "@/components/shared/EventForm";
import Hero from "@/components/shared/Hero";
import UserHeader from "@/components/shared/UserHeader";
import EventList from "@/components/shared/EventList";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row">
      <div className="md:w-2/5">{/* <UserHeader /> */}</div>
      <div className="md:w-3/5">
        {/* <EventList /> */}

        {/* <EventForm /> */}
      </div>

      {/* <Hero /> */}
    </main>
  );
}
