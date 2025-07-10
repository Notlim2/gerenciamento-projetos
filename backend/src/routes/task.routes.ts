import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { validateDto } from "../middlewares/validate";
import { GetTasksDto } from "../dtos/tasks/get-tasks.dto";
import { IdDto } from "../dtos/common/id.dto";
import { CreateTaskDto } from "../dtos/tasks/create-task.dto";
import { UpdateTaskDto } from "../dtos/tasks/update-task.dto";

const router = Router();

router.get("/", validateDto(GetTasksDto, "query"), TaskController.getAll);
router.get("/:id", validateDto(IdDto, "params"), TaskController.getById);
router.post("/", validateDto(CreateTaskDto, "body"), TaskController.create);
router.put(
  "/:id",
  validateDto(IdDto, "params"),
  validateDto(UpdateTaskDto, "body"),
  TaskController.update
);
router.delete("/:id", validateDto(IdDto, "params"), TaskController.delete);

export default router;
