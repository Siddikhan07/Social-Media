import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
  try {
    const { username, password, ...otherDetails } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User is already registered!" });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password and other details
    const newUser = new UserModel({ username, password: hashedPassword, ...otherDetails });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      {
        username: savedUser.username,
        id: savedUser._id,
      },
      "MERN",
      { expiresIn: "1h" }
    );

    // Send the response with the user data and token
    res.status(200).json({ user: savedUser, token });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ message: error.message });
  }
};


export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          "MERN",
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      } else {
        res.status(400).json("Incorrect password");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};