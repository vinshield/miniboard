"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chat = async () => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: "Write a haiku about mars",
        },
      ],
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error(`Error getting response: ${error}`);
    throw error;
  }
};

export const extractPosterInfo = async (imageUrl) => {
  //Add file compression logic. Compress file to 250 by 250px
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: 'Extract info from a Nigerian university event/announcement poster and return it in JSON. Start with { and end with }. If a field is missing, return "". Keys:\ntitle: Event/announcement title/theme (string). Use emojis thoughtfully based on the event\'s mood; consider using emojis for lively events but refrain from using them for serious or formal events.\nstartDate: Event start (JS date object, WAT, UTC+1).\nendDate: Event end (JS date object, WAT, UTC+1).\nlocation: If the event is online, return the URL. If it is a physical event, return the event location (string).\ndescription: Description of the event/announcement giving important details for Nigerian university students aged between 15 and 23. Include emojis where appropriate but vary the usage to maintain interest.\ncategory: Event category (up to 2): Career, Social, Sports, Health & Wellness, Volunteer, Workshop & Skill Building, Chill & Low Key, Religious. Use Announcement if applicable.\naffectedColleges: If an announcement, choose: ALL COLLEGES, ENG, LAW, SMS, MHS, SCI, PHARM. If an event, return "".\nisOnline: true if online, false otherwise.',
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: imageUrl },
            },
          ],
        },
      ],
      temperature: 1.9,
      max_tokens: 16383,
      top_p: 0.9,
      frequency_penalty: 2,
      presence_penalty: 2,
      response_format: {
        type: "json_object",
      },
    });
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({
    //       title: "Sip n' Social HangOut!!",
    //       startDate: "2024-02-17T14:00:00+01:00",
    //       endDate: "",
    //       venue: "Love Garden Beside College 1",
    //       description:
    //         "Join us for an exciting day of fun! 🎉 Sip & Paint, games, music, and giveaways await! Don't miss out on the raffle draw and refreshments! 🎨🎶",
    //       category: "Social",
    //       affectedColleges: "",
    //       isOnline: false,
    //       meetingLink: "",
    //     });
    //   }, 3000);
    // });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error(`Error getting response: ${error}`);
    throw error;
  }
};

// Extract info from a Nigerian university event/announcement poster and return it in JSON. Start with { and end with }. If a field is missing, return "". Keys:
// title: Event/announcement title (string).
// startDate: Event start (JS date object, WAT, UTC+1).
// endDate: Event end (JS date object, WAT, UTC+1).
// venue: Event location (string).
// description: Catchy description for Nigerian students aged between 15 and 23 (100 tokens max, include emojis).
// category: Event category (up to 2): Career, Social, Sports, Health & Wellness, Volunteer, Workshop & Skill Building, Chill & Low Key, Religious. Use Announcement if applicable.
// affectedColleges: If an announcement, choose: ALL COLLEGES, ENG, LAW, SMS, MHS, SCI, PHARM. If an event, return "".
// isOnline: true if online, false otherwise.
// meetingLink: URL for online events.

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
