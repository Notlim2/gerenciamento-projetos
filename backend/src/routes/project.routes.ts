import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import { validateDto } from "../middlewares/validate";
import { UpdateProjectDto } from "../dtos/projects/update-project.dto";
import { IdDto } from "../dtos/common/id.dto";
import { CreateProjectDto } from "../dtos/projects/create-project.dto";
import { GetProjectsDto } from "../dtos/projects/get-projects.dto";

const router = Router();

router.get("/", validateDto(GetProjectsDto, "query"), ProjectController.getAll);
router.get("/:id", validateDto(IdDto, "params"), ProjectController.getById);
router.post(
  "/",
  validateDto(CreateProjectDto, "body"),
  ProjectController.create
);
router.put(
  "/:id",
  validateDto(UpdateProjectDto, "body"),
  validateDto(IdDto, "params"),
  ProjectController.update
);
router.delete("/:id", validateDto(IdDto, "params"), ProjectController.delete);

export default router;
