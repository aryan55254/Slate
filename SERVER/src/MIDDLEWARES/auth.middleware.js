import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//middleware to verify token
const verifytoken = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({ message: " no token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
};
export default verifytoken;
