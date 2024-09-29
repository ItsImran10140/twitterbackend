import { Router } from "express";
const router = Router();

// Tweet create
router.post("/", (req, res) => {
  res.status(501).json({ error: "No Implemented" });
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
