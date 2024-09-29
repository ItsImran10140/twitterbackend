// src/index.ts
import express from "express";
import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";

const app = express();
const port = 3000;
app.use(express.json());
app.use("/user", userRoutes);
app.use("/tweet", tweetRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World Automatic");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
