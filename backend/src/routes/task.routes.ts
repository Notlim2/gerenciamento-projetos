import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const router = Router();

router.get("/", TaskController.getAll);
router.get("/:id", TaskController.getById);
router.post("/", TaskController.create);
router.delete("/:id", TaskController.delete);

export default router;
