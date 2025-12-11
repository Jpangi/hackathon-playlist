const express = require("express");
const router = express.Router();
console.log("Song router loaded!");
const {
  addSong,
  showSongs,
  singleSong,
  updateSong,
  deleteSong,
} = require("../controllers/songController");

// Get all songs for the logged-in user
router.get("/", showSongs);
// Add a song
router.post("/create", addSong);
// Get single song
router.get("/:id", singleSong);
//delete a song
router.delete("/:id", deleteSong);
//update a song
router.put("/update/:id", updateSong);

module.exports = router;
