import { Router } from 'express';
import projectController from '../controllers/project.controller.js';


const router = Router();
router.post("/createproject", projectController.createProject);
router.get("/allprojects", projectController.allProjects);
router.get("/myprojects/:projectId/admin/:adminId", projectController.adminProjects);
router.get('/member/:userId', projectController.projectsByMember);

export default router;