"use server";

import OpenAI from "openai";
import sharp from "sharp";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const extractPosterInfo = async (imageUrl) => {
  // TO-DO
  // Optimize system instructions. Consider taking a course on prompt engineering

  // remove the 'data:image/png' prefix from the base64 file that was sent
  imageUrl = imageUrl.split(";base64,").pop();

  // convert file to buffer because sharp requires a buffer as input
  imageUrl = Buffer.from(imageUrl, "base64");

  // resize image to reduce api cost
  imageUrl = await sharp(imageUrl)
    .resize({ width: 512, height: 512, fit: "contain" })
    .withMetadata()
    .jpeg({ quality: 80 })
    .toBuffer();

  // convert buffer to base64 data, openai api requires the image to come in this format
  let bufferAppend = await sharp(imageUrl).metadata();
  bufferAppend = `data:image/${bufferAppend.format};base64,`;
  imageUrl = imageUrl.toString("base64");
  imageUrl = `${bufferAppend}${imageUrl}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: 'Extract info from a Nigerian university event/announcement poster and return it in JSON. Start with { and end with }. If a field is missing, return "". Stick to these keys strictly:\ntitle: Event/announcement title/theme (string). Use emojis thoughtfully based on the event\'s mood; consider using emojis for lively events but refrain from using them for serious or formal events.\nstartDateTime: Event start (JS date object, WAT, UTC+1). If you\'re unsure of the year, then use 2024\nendDateTime: Event end (JS date object, WAT, UTC+1). If you\'re unsure of the year, then use 2024\nlocation: If the event is online, return the URL to the meeting. If it is a physical event, return the event location (string).\ndescription: Craft a catchy and engaging description tailored for Nigerian students aged between 15 and 23. Vary the opening and closing lines to avoid repetition, incorporating different phrases and tones. Include all relevant details. Include emojis where appropriate but vary the usage to maintain interest.\ncategory: Event category (up to 2): Career, Social, Sports, Health & Wellness, Volunteer, Workshop & Skill Building, Chill & Low Key, Religious. Use Announcement if applicable.\naffectedColleges: If an announcement, choose: ALL COLLEGES, ENG, LAW, SMS, MHS, SCI, PHARM. If an event, return "".\nisOnline: true if online, false otherwise.',
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
      temperature: 1.5,
      max_tokens: 4000,
      top_p: 0.5,
      frequency_penalty: 1,
      presence_penalty: 1,
      response_format: {
        type: "json_object",
      },
    });

    const simulatedResponse = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          title: "Sip n' Social HangOut!!",
          startDate: "2024-02-17T14:00:00+01:00",
          endDate: "",
          location: "Love Garden Beside College 1",
          description:
            "Join us for an exciting day of fun! 🎉 Sip & Paint, games, music, and giveaways await! Don't miss out on the raffle draw and refreshments! 🎨🎶 Always be there you know that we will be there too we will be there for you no matter the weather we will always show up now you know you must know better",
          category: "Social",
          affectedColleges: "",
          isOnline: false,
          meetingLink: "",
        });
      }, 3000);
    });

    // return simulatedResponse;
    // send response as json to be correctly interpreted by frontend
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
