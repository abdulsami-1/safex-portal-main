/**
 * seed.js
 * -------
 * Populates the database with sample candidates for development and testing.
 * Run with:  npm run seed
 *
 * WARNING: Clears the candidates collection before inserting.
 * Do not run against a production database.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Candidate = require("./models/Candidate");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/safex_portal";

const sampleCandidates = [
  { name: "Priya Nair",     group: "Group 1", field: "Web Development",    role: "Frontend Developer",    rating: 4, taskStatus: "In Progress" },
  { name: "Marcus Webb",    group: "Group 1", field: "Security Ops",        role: "Threat Analyst",        rating: 5, taskStatus: "Complete"    },
  { name: "Soo-Jin Park",   group: "Group 2", field: "Data & Analytics",    role: "Data Engineer",         rating: 3, taskStatus: "In Progress" },
  { name: "Tom\u00e1s Herrera", group: "Group 2", field: "Design",             role: "UX Researcher",         rating: 4, taskStatus: "Not Started" },
  { name: "Aisha Okonkwo",  group: "Group 3", field: "Product",             role: "Product Analyst",       rating: 5, taskStatus: "Complete"    },
  { name: "Dmitri Volkov",  group: "Group 3", field: "Software Engineering",role: "Backend Developer",     rating: 2, taskStatus: "Blocked"     },
  { name: "Lena Hoffmann",  group: "Group 4", field: "DevOps",              role: "Infrastructure Intern", rating: 4, taskStatus: "In Progress" },
  { name: "Jordan Osei",    group: "Group 4", field: "Web Development",    role: "Full-Stack Developer",  rating: 3, taskStatus: "Not Started" },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    await Candidate.deleteMany({});
    console.log("Cleared existing candidates");
    const inserted = await Candidate.insertMany(sampleCandidates);
    console.log(`Inserted ${inserted.length} candidates`);
    await mongoose.disconnect();
    console.log("Done. Connection closed.");
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
