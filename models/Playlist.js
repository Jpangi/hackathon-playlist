const mongoose = require("mongoose");

const SongSchema = mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
});

const PlaylistSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  songs: [SongSchema],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;
