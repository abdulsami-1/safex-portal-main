/**
 * routes/candidates.js
 * --------------------
 * REST endpoints for the Candidate resource.
 * Mounted at /api/candidates in server.js.
 *
 * Week 1:
 *   GET  /api/candidates  — list all (supports ?group= and ?field= filters)
 *   POST /api/candidates  — create one (for seeding / admin use)
 *
 * Future weeks: add PUT /api/candidates/:id and DELETE /api/candidates/:id here.
 */

const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.group) filter.group = req.query.group;
    if (req.query.field) filter.field = req.query.field;
    const candidates = await Candidate.find(filter).sort({ name: 1 });
    res.json({ success: true, count: candidates.length, data: candidates });
  } catch (err) {
    console.error("GET /api/candidates error:", err.message);
    res.status(500).json({ success: false, message: "Server error fetching candidates" });
  }
});

router.post("/", async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    const saved = await candidate.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join("; ") });
    }
    console.error("POST /api/candidates error:", err.message);
    res.status(500).json({ success: false, message: "Server error creating candidate" });
  }
});

module.exports = router;
