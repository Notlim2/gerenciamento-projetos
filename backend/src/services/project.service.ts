import { Project } from "../generated/prisma";
import { ProjectRepository } from "../repositories/project.repository";

export const ProjectService = {
  listProjects: () => ProjectRepository.getAll(),

  getProject: (id: number) => ProjectRepository.getById(id),

  createProject: (project: Omit<Project, "id">) =>
    ProjectRepository.create(project),

  deleteProject: (id: number) => ProjectRepository.delete(id),
};
