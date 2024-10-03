import { Document, model, models, Schema } from "mongoose";
import { nanoid } from "nanoid";

const EventSchema = new Schema({
  publicId: { type: String, unique: true, default: () => nanoid(8) },
  title: { type: String, required: true },
  description: { type: String },
  caption: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  // posterUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  isOnline: { type: Boolean, default: false },
  numOfSaves: { type: Number, default: 0 },
  // organizer: { type: Schema.Types.ObjectId, ref: "User" },
  //   url: { type: String },
  //   category: { type: Schema.Types.ObjectId, ref: "Category" },
  //   price: { type: String },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;

// export interface IEvent extends Document {
//   _id: string;
//   title: string;
//   description?: string;
//   location?: string;
//   createdAt: Date;
//   imageUrl: string;
//   startDateTime: Date;
//   endDateTime: Date;
//   price?: string;
//   isFree: boolean;
//   url?: string;
//   category: { _id: string; name: string };
//   organizer: { _id: string; firstName: string; lastName: string };
// }
