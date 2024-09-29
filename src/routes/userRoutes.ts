import { Router } from "express";
const router = Router();

// user create
router.post("/", (req, res) => {
  res.status(501).json({ error: "No Implemented" });
});
// List users
router.get("/", (req, res) => {
  res.status(501).json({ error: "No Implemented" });
});
// get one user
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `No Implemented ${id}` });
});
// update user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `No Implemented ${id}` });
});
// delete user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `No Implemented ${id}` });
});

export default router;
