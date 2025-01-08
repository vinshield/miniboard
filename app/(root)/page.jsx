import EventCard from "@/components/shared/EventCard";
import EventForm from "@/components/shared/EventForm";
import Hero from "@/components/shared/Hero";
import UserHeader from "@/components/shared/UserHeader";

export default function Home() {
  return (
    <main>
      <UserHeader />
      <EventForm />
      <EventCard />
      <EventCard />
      <EventCard />

      {/* <Hero /> */}
    </main>
  );
}
