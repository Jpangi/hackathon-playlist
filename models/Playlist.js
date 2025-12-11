const mongoose = require("mongoose");
const { SongSchema } = require("./Songs");

const PlaylistSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);
module.exports = Playlist;
