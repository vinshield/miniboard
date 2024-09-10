import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="mt-14 flex min-h-screen flex-col items-center px-10 lg:container">
      <p className="rounded-full border border-dashed border-gray-400 px-6 py-[6px] text-xs font-bold text-muted-foreground">
        miniboard 📰
      </p>
      <h1 className="leading-12 mt-6 text-center text-5xl font-bold tracking-tighter md:text-7xl">
        Promote your event like a <span className="highlight-2">pro</span>
      </h1>
      <p className="mt-6 text-center text-base tracking-tight text-[#010D3E]">
        Effortlessly create WhatsApp-ready event captions with reminders for
        your guests
      </p>
      <Button asChild className="mx-auto mt-6">
        <Link href="/events/create">Get started 🚀</Link>
      </Button>
    </section>
  );
};

export default Hero;
