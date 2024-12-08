import Login from "../models/adminModel.js";
import TokenAndCookie from "../utils/TokenAndCookie.js";
import bcrypt from "bcrypt";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || email == "" || password == "") {
      return res.status(400).json({
        message: "All fields are required and cannot be empty",
      });
    }
    const user = await Login.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    await TokenAndCookie(Login._id, res);
    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while processing your request",
    });
  }
};

export const adminLogout = (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
    });
    return res.status(200).json({
      message: "Logout Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};
