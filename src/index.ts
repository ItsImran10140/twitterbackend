// src/index.ts
import express from "express";
import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import authRoutes from "./routes/authRoutes";
import { authenticationToken } from "./middleware/authMiddleware";

const app = express();
const port = 3000;
app.use(express.json());
app.use("/user", authenticationToken, userRoutes);
app.use("/tweet", authenticationToken, tweetRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World Automatic");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
