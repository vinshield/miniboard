import { Document, model, models, Schema } from "mongoose";
import { nanoid } from "nanoid";

const EventSchema = new Schema({
  publicId: { type: String, unique: true, default: () => nanoid(8) },
  title: { type: String, required: true },
  description: { type: String },
  caption: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  posterUrl: { type: String },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  isOnline: { type: Boolean, default: false },
  isAllDay: { type: Boolean, default: false },
  numOfSaves: { type: Number, default: 0 },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
  imageUrl: { type: String, default: "https://via.placeholder.com/150" },
  organizerClerkId: { type: String },

  //   url: { type: String },
  //   category: { type: Schema.Types.ObjectId, ref: "Category" },
  //   price: { type: String },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
