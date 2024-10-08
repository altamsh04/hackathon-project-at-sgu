import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();

router.get('/users', usersController.dbUsers);
router.get('/users/:id', usersController.getUserById);

export default router;
