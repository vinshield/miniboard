import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
	return (
		<section className='container min-h-screen flex flex-col items-center'>
			<h1 className='mt-24 text-center text-5xl px-5 font-bold tracking-tighter md:text-7xl leading-12'>
				Promote your event like a <span className='highlight-2'>pro</span>
			</h1>
			<p className='mt-6 px-5 text-xl text-center tracking-tight text-[#010D3E]'>
				Effortlessly create WhatsApp-ready event captions with reminders
			</p>

			<Button asChild className='mt-6 mx-auto'>
				<Link href='/events/create'>Get started 🚀</Link>
			</Button>
		</section>
	);
};

export default Hero;
