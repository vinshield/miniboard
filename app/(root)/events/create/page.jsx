import EventForm from "@/components/shared/EventForm";
import Header from "@/components/shared/Header";
import React from "react";

const CreateEvent = () => {
	return (
		<div className='container'>
			<h1>CreateEvent</h1>
			<Header />
			<EventForm />
		</div>
	);
};

export default CreateEvent;
