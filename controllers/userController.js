const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/Users");
require("dotenv").config();

const SALT_LENGTH = 12;

// function to create a token for user
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

//Sign-up controller function
const signUp = async (req, res) => {
  try {
    //deconstruct username and passowrd from User model
    const { username, password } = req.body;

    // checks to see if a username is already in the database
    const userExists = await User.findOne({ username });
    if (userExists)
      return res.status(400).json({ message: "Username already taken" });

    //creates a user with a hashedpassword
    const hashedPassword = bcrypt.hashSync(password, SALT_LENGTH);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    //runs the createToken function from line 8 and passes in user._id
    const token = createToken(user._id);

    res.json({ message: "User Created", token, user });
  } catch (error) {
    res.status(400).json({ message: "Error With signup", error });
  }
};

//login controller function
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    //checks to see if user exists
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "username does not exist" });
    //checks to see if password entered matches
    const matchPassword = bcrypt.compareSync(password, user.password);

    if (!matchPassword)
      return res.status(400).json({ message: "Incorrect Password" });
    //creates a token for user
    const token = createToken(user._id);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { signUp, login };
