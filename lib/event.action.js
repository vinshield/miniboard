import OpenAI from "openai";
const openai = new OpenAI();

const completion = async () =>
	await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [
			{ role: "system", content: "You are a helpful assistant." },
			{
				role: "user",
				content: "Write a haiku about recursion in programming.",
			},
		],
	});

console.log(completion.choices[0].message);

// You will be sent a poster of an event or announcement on a university campus in Nigeria. From the poster, you are to extract some information and send it back in JSON format. The keys are explained below

// 1. title: the title of the event or announcement (formatted as a string). If not provided, reply with an empty string.
// 2. startDate: The event start date (formatted as a javascript date object). If not provided, reply with an empty string
// 3. endDate: The event end date (formatted as a javascript date object). If not provided, reply with an empty string
// 4. venue: The venue (formatted as a string). If not provided, reply with an empty string.
// 5.  description: A string. A short description of not more than 80 tokens. The description to be catchy in order to make the event attractive to university students. The students are between the ages of 15 and 23 and live in Nigeria. Feel free to use emojis in the description
// 6. category: A string. A category for the event. Based on information from the poster, choose at least one and at most two of the following categories: Career, Social, Sports, Health & Wellness, Volunteer, Workshop & Skill Building, Chill & Low Key, Religious.  If you notice that it is an announcement and not an event, then use only the category of Announcement and no other.
// 7. affectedColleges: Affected colleges. If it is an event and not an announcement, return null for this, otherwise, return any of the following in an array depending on the the information on the poster: "ALL COLLEGES",
//     "ENG",
//     "LAW",
//     "SMS",
//     "MHS",
//     "SCI",
//     "PHARM"
// ENG is for the Engineering college
// LAW is for the College of Law
// SMS is for the College of Social and Management Sciences
// MHS is for the college of medicine and health sciences
// SCI is for the college of sciences
// PHARM is for the college of pharmacy
// Use ALL COLLEGES is the college is not specified in the poster
// 8. isOnline: A boolean. True if it is an online event, otherwise, false.
// 9. meetingLink: If it is an online event and you can extract the url for the online meeting, put that url here, otherwise, reply with an empty string.
