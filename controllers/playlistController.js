const Playlist = require("../models/Playlist.js");
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// // Located in middleware folder
// function verifyToken(req, res, next) {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Invalid auth token" });
//   }
// }

// Create playlist
router.post("/create", async (req, res) => {
  try {
    req.body.author = req.user._id;
    const playlist = await Playlist.create(req.body);
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Get all playlists
router.get("/", async (req, res) => {
  try {
    const playlists = await Playlist.find({ author: req.user._id });
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Get single playlist
router.get("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ err: "Playlist not found" });
    res.status(200).json(playlist);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Update playlist
router.put("/update/:id", async (req, res) => {
  try {
    const updated = await Playlist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Delete playlist
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Playlist.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
