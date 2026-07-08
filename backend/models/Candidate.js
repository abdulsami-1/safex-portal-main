const mongoose = require("mongoose");

/**
 * Candidate Schema
 * ----------------
 * Canonical data model for the SafeX Intern Candidate Management Portal.
 * Week 1 — intentionally flat. Future groups adding fields should:
 *   1. Add the field below with a comment explaining its purpose.
 *   2. Mark it optional unless it must exist on all records.
 *   3. Provide a default so existing documents are not broken.
 *   4. Update seed.js with at least one example.
 *
 * Do NOT rename existing fields — frontend and API reference these key names.
 */

const CandidateSchema = new mongoose.Schema(
  {
    // Full legal name. Primary display identifier across all views.
    name: {
      type: String,
      required: [true, "Candidate name is required"],
      trim: true,
    },

    // Assigned cohort group (e.g. "Group 1"). Keep format consistent
    // so directory filters work correctly.
    group: {
      type: String,
      required: [true, "Group assignment is required"],
      trim: true,
    },

    // Functional discipline. Enum enforced so filter dropdowns stay consistent.
    // To add a new field: append to enum AND update FIELD_OPTIONS in
    // frontend/src/pages/CandidateDirectory.jsx.
    field: {
      type: String,
      required: [true, "Field/discipline is required"],
      enum: {
        values: [
          "Web Development",
          "Security Ops",
          "Data & Analytics",
          "Design",
          "Product",
          "Software Engineering",
          "DevOps",
        ],
        message: "{VALUE} is not a recognised field. Add it to the enum in models/Candidate.js first.",
      },
    },

    // Specific role within the group (e.g. "Frontend Dev", "Threat Analyst").
    // Free-text for now; may become an enum in a later week.
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
    },

    // Evaluator rating 1–5. Do not widen range without updating RatingDots component.
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },

    // Task completion status. Drives status pill colour in the directory.
    // To add a status: append to enum AND update STATUS_COLORS in
    // frontend/src/pages/CandidateDirectory.jsx.
    taskStatus: {
      type: String,
      required: [true, "Task status is required"],
      enum: {
        values: ["Not Started", "In Progress", "Blocked", "Complete"],
        message: "{VALUE} is not a valid task status.",
      },
    },

    // --- EXTENSION POINT ---
    // Future groups: add new fields below this line.
    // Example:
    //   notes:       { type: String, default: "" },
    //   mentorId:    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //   weeklyScore: { type: Number, min: 0, max: 100 },
  },
  {
    // Adds createdAt and updatedAt automatically. Do not set manually.
    timestamps: true,
  }
);

module.exports = mongoose.model("Candidate", CandidateSchema);
