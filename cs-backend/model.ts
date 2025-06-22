import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  date: { type: String, require: true },
  symptom: { type: String, require: true },
  category: { type: String, require: true },
  severity: { type: Number, require: true },
  notes: String,
  timeOfDay: {
    type: String,
    require: true,
    enum: ["morning", "afternoon", "evening", "night"],
  },
  duration: Number,
  createdAt: { type: String, require: true },
});

export const Symptom = mongoose.model("Symptom", schema);
