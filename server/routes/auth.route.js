import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import authenticateToken from '../middleware/auth.middleware.js';

const router = Router();

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.post("/logout", authController.logout);
router.post("/authorization", authenticateToken);

export default router;
