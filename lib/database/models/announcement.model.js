import { model, models, Schema } from "mongoose";

const AnnouncementSchema = new Schema({
  title: { type: String, required: true },
  details: { type: String },
  createdAt: { type: Date, default: Date.now },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
});

const Announcement =
  models.Announcement || model(Announcement, "AnnouncementSchema");

export default Announcement;
