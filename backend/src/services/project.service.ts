import { ProjectRepository } from "../repositories/project.repository";
import { CreateProjectDto } from "../dtos/projects/create-project.dto";
import { UpdateProjectDto } from "../dtos/projects/update-project.dto";
import { GetProjectsDto } from "../dtos/projects/get-projects.dto";

export const ProjectService = {
  listProjects: (filters: GetProjectsDto) => ProjectRepository.getAll(filters),

  getProject: (id: number) => ProjectRepository.getById(id),

  createProject: (project: CreateProjectDto) =>
    ProjectRepository.create(project),

  updateProject: (id: number, project: UpdateProjectDto) =>
    ProjectRepository.update(id, project),

  deleteProject: (id: number) => ProjectRepository.delete(id),
};
