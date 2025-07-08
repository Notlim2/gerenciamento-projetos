import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";

const router = Router();

router.get("/", ProjectController.getAll);
router.get("/:id", ProjectController.getById);
router.post("/", ProjectController.create);
router.delete("/:id", ProjectController.delete);

export default router;
