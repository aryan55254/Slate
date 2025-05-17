import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./DATABASE/connectdb.js";
import cookieparser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(cookieparser);

//root path
app.get("/", (req, res) => {
  res.send("Backend Is running");
});

const startserver = async () => {
  try {
    await connectdb();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("server startup error:", error);
    process.exit(1);
  }
};
startserver();
