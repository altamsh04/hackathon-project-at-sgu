import { Router } from "express";
import authenticateToken from "../middleware/auth.middleware.js";

const router = Router();

router.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: `Hello, ${req.user.username}! You have access to this protected route.`,
  });
});

export default router;
