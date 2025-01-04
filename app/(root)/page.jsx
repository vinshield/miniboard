import EventCard from "@/components/shared/EventCard";
import Hero from "@/components/shared/Hero";
import UserHeader from "@/components/shared/UserHeader";

export default function Home() {
  return (
    <main >
      <UserHeader />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />

      {/* <Hero /> */}
    </main>
  );
}
