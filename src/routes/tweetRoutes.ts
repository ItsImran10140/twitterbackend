import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();
const prisma = new PrismaClient();

// Tweet create
router.post("/", async (req, res) => {
  const { content, image, userId } = req.body;
  try {
    const result = await prisma.tweet.create({
      data: {
        content,
        image,
        userId,
      },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: "Something is not Right !!!" });
  }
});
// List Tweets
router.get("/", (req, res) => {
  res.status(501).json({ error: "No Implemented" });
});
// get one Tweet
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `No Implemented ${id}` });
});
// update Tweet
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `No Implemented ${id}` });
});
// delete Tweet
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `No Implemented ${id}` });
});

export default router;
