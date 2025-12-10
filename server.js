// =======================
// ======= IMPORTS =======
// =======================
const dotenv = require("dotenv");
dotenv.config(); //code that allows env variables
const express = require("express");
const mongoose = require("mongoose");
const app = express(); // the express framework is in the app variable
const userRoutes = require("./routes/userRoutes");
// ===========================
// ======== MIDDLEWARE =======
// ===========================

//middleware goes here
app.use("/users", userRoutes);
app.use("/playlists", playlistRouter);

// =========================== =======
// ======== MONGOOSE CONNECTION =======
// =========================== =======
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

let PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
