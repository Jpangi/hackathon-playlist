const express = require("express");
const Song = require("../models/Songs");
const router = express.Router();

// Add a song
router.post("/create", async (req, res) => {
  try {
    req.body.author = req.user._id; // attached by requireAuth
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (err) {
    res.status(500).json({ message: "Song not added", err: err.message });
  }
});

// Get all songs for the logged-in user
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find({ author: req.user._id });
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Get single song
router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ err: "Song not found" });
    res.status(200).json(song);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Update song
router.put("/update/:id", async (req, res) => {
  try {
    const updated = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Delete song
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Song.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
