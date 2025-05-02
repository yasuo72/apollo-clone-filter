import Doctor from "../models/Doctor.js";
import Joi from "joi";

// Validation schema
const doctorSchema = Joi.object({
  name: Joi.string().required(),
  specialty: Joi.string().required(),
  experience: Joi.number().min(0).required(),
  rating: Joi.number().min(1).max(5).required(),
  location: Joi.string().required(),
  languages: Joi.array().items(Joi.string()).required(),
  availability: Joi.string().required(),
  consultation_fee: Joi.number().required(),
  image_url: Joi.string().uri().allow(""),
  bio: Joi.string().allow(""),
  isVerified: Joi.boolean()
});

// Add a doctor
export const addDoctor = async (req, res) => {
  try {
    const { error } = doctorSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, error: error.details[0].message });
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ success: true, doctor });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// List doctors with filters and pagination
export const listDoctors = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      specialty,
      location,
      languages,
      "experience[gte]": minExp,
      "rating[gte]": minRating,
      "fee[lte]": maxFee,
      availability,
      sort
    } = req.query;

    // Build query
    const query = {};
    
    // Apply filters
    if (specialty) query.specialty = specialty;
    if (location) query.location = { $regex: location, $options: "i" };
    if (languages) query.languages = languages;
    if (minExp) query.experience = { $gte: Number(minExp) };
    if (minRating) query.rating = { $gte: Number(minRating) };
    if (maxFee) query.consultation_fee = { $lte: Number(maxFee) };
    if (availability) query.availability = availability;

    // Build sort object
    let sortOptions = { rating: -1 }; // Default sort by rating (highest first)
    
    if (sort) {
      // Handle sort parameter
      if (sort === '-experience') {
        sortOptions = { experience: -1 };
      } else if (sort === 'consultation_fee') {
        sortOptions = { consultation_fee: 1 };
      } else if (sort === '-rating') {
        sortOptions = { rating: -1 };
      }
    }

    // Execute query with pagination and sorting
    const doctors = await Doctor.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Doctor.countDocuments(query);

    res.json({
      success: true,
      data: doctors,
      page: Number(page),
      pages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
