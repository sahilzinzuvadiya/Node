import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signToken } from "../middleware/authMiddleware.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
      role: role === "admin" ? "admin" : "user"
    });

    const token = signToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax"
      })
      .status(201)
      .json({
        message: "User registered",
        user: { id: user._id, username: user.username, role: user.role }
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = signToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax"
      })
      .json({
        message: "Logged in",
        user: { id: user._id, username: user.username, role: user.role }
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token")
    .json({ message: "Logged out" });
};
