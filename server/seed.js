import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "./models/Doctor.js";

dotenv.config();

const doctors = [
  {
    name: "Dr. Aarti Sharma",
    specialty: "General Physician",
    experience: 15,
    rating: 4.8,
    location: "Delhi",
    languages: ["English", "Hindi"],
    availability: "Hospital Visit",
    consultation_fee: 500,
    image_url: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Experienced General Physician with 15 years of clinical practice.",
    isVerified: true
  },
  {
    name: "Dr. Rajesh Kumar",
    specialty: "Internal Medicine",
    experience: 12,
    rating: 4.6,
    location: "Mumbai",
    languages: ["English", "Hindi", "Marathi"],
    availability: "Online",
    consultation_fee: 700,
    image_url: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Specializes in treating complex medical conditions and chronic diseases.",
    isVerified: true
  },
  {
    name: "Dr. Priya Patel",
    specialty: "General Physician",
    experience: 8,
    rating: 4.5,
    location: "Bangalore",
    languages: ["English", "Hindi", "Kannada"],
    availability: "Hospital Visit",
    consultation_fee: 600,
    image_url: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Focused on preventive care and holistic health management.",
    isVerified: true
  },
  {
    name: "Dr. Sanjay Gupta",
    specialty: "Internal Medicine",
    experience: 20,
    rating: 4.9,
    location: "Chennai",
    languages: ["English", "Tamil", "Hindi"],
    availability: "Online",
    consultation_fee: 800,
    image_url: "https://randomuser.me/api/portraits/men/46.jpg",
    bio: "Senior consultant with expertise in critical care and emergency medicine.",
    isVerified: true
  },
  {
    name: "Dr. Ananya Singh",
    specialty: "General Physician",
    experience: 5,
    rating: 4.3,
    location: "Hyderabad",
    languages: ["English", "Hindi", "Telugu"],
    availability: "Online",
    consultation_fee: 450,
    image_url: "https://randomuser.me/api/portraits/women/90.jpg",
    bio: "Young and dynamic doctor with a focus on patient education and lifestyle medicine.",
    isVerified: false
  },
  {
    name: "Dr. Vikram Reddy",
    specialty: "Internal Medicine",
    experience: 10,
    rating: 4.7,
    location: "Pune",
    languages: ["English", "Hindi", "Marathi"],
    availability: "Hospital Visit",
    consultation_fee: 650,
    image_url: "https://randomuser.me/api/portraits/men/67.jpg",
    bio: "Specializes in diabetes management and cardiovascular health.",
    isVerified: true
  },
  {
    name: "Dr. Meera Kapoor",
    specialty: "General Physician",
    experience: 3,
    rating: 4.2,
    location: "Delhi",
    languages: ["English", "Hindi"],
    availability: "Online",
    consultation_fee: 400,
    image_url: "https://randomuser.me/api/portraits/women/33.jpg",
    bio: "Passionate about making healthcare accessible and affordable.",
    isVerified: false
  },
  {
    name: "Dr. Arjun Mehta",
    specialty: "Internal Medicine",
    experience: 7,
    rating: 4.5,
    location: "Mumbai",
    languages: ["English", "Hindi", "Gujarati"],
    availability: "Hospital Visit",
    consultation_fee: 550,
    image_url: "https://randomuser.me/api/portraits/men/22.jpg",
    bio: "Specializes in respiratory disorders and infectious diseases.",
    isVerified: true
  },
  {
    name: "Dr. Kavita Nair",
    specialty: "General Physician",
    experience: 14,
    rating: 4.7,
    location: "Bangalore",
    languages: ["English", "Kannada", "Tamil"],
    availability: "Online",
    consultation_fee: 750,
    image_url: "https://randomuser.me/api/portraits/women/56.jpg",
    bio: "Experienced physician with expertise in women's health and geriatric care.",
    isVerified: true
  },
  {
    name: "Dr. Rahul Verma",
    specialty: "Internal Medicine",
    experience: 9,
    rating: 4.4,
    location: "Hyderabad",
    languages: ["English", "Hindi", "Telugu"],
    availability: "Hospital Visit",
    consultation_fee: 600,
    image_url: "https://randomuser.me/api/portraits/men/36.jpg",
    bio: "Specializes in digestive disorders and metabolic conditions.",
    isVerified: true
  },
  {
    name: "Dr. Neha Sharma",
    specialty: "General Physician",
    experience: 4,
    rating: 4.1,
    location: "Chennai",
    languages: ["English", "Tamil", "Hindi"],
    availability: "Online",
    consultation_fee: 350,
    image_url: "https://randomuser.me/api/portraits/women/29.jpg",
    bio: "Focuses on preventive healthcare and lifestyle modifications.",
    isVerified: false
  },
  {
    name: "Dr. Karthik Rajan",
    specialty: "Internal Medicine",
    experience: 16,
    rating: 4.8,
    location: "Pune",
    languages: ["English", "Marathi", "Hindi"],
    availability: "Hospital Visit",
    consultation_fee: 900,
    image_url: "https://randomuser.me/api/portraits/men/52.jpg",
    bio: "Senior consultant with expertise in cardiology and pulmonology.",
    isVerified: true
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
    
    await Doctor.deleteMany({});
    console.log("Deleted existing doctors");
    
    await Doctor.insertMany(doctors);
    console.log("Database seeded with sample doctors!");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
