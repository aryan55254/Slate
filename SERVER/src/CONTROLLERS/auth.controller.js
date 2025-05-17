import User from "../MODELS/User";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

//salt generation
const salt = bcrypt.genSaltSync(10);

//user registration
export const regsiter = async (req, res) => {
  const { fullname, username, password } = req.body;

  if (!fullname || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existinguser = await User.findOne({ username });
    if (existinguser) {
      return res.status(400).json({ message: "UserName Already Exists" });
    }
    const hashedpassword = bcrypt.hashSync(password, salt);
    const usercreate = await User.create({
      fullname,
      username,
      password: hashedpassword,
    });
    res.status(201).json({
      message: "User created!",
      user: {
        id: usercreate._id,
        username: usercreate.username,
      },
    });
  } catch (error) {
    console.log("Registration Error", error);
    res.status(500).json({ message: "error registering user" });
  }
};
//user login
export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Both Fields Are Required" });
  }
  try {
    const userfind = await User.findOne(username);
    if (!userfind) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const passwordcheck = bcrypt.compareSync(password, userfind.password);
    if (!passwordcheck) {
      return res.status(400).json({ message: "inavlid credentials" });
    }
    const token = jwt.sign(
      { username, fullname: userfind.fullname, id: userfind._id },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "logged in succesfully" });
  } catch (error) {
    console.log("login error", error);
    res.status(500).json({ message: "internal server error" });
  }
};
//get profile
export const getprofle = async (req, res) => {
  res.json(req.user);
};
//logout
export const logout = async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: new Date(0),
    })
    .json({ message: "logged out successfully" });
};
