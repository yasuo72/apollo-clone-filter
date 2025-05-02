import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  location: { type: String, required: true },
  languages: [{ type: String, required: true }],
  availability: { type: String, required: true },
  consultation_fee: { type: Number, required: true },
  image_url: String,
  bio: String,
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Doctor", doctorSchema);
