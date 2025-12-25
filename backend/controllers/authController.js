const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { name, email, password, role } = req.body;
    // role = role?.trim().toLowerCase();
    // if (role === "admin" && password !== "admin123") {
    //   return res.status(400).json({ message: "Admin secret key error" });
    // }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("REGISTER ERROR 👉", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
