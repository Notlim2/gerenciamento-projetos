import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";

export const ProjectController = {
  getAll: async (req: Request, res: Response) => {
    const projects = await ProjectService.listProjects();
    res.json(projects);
  },

  getById: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const project = await ProjectService.getProject(id);
    if (!project) {
      res.status(404).json({ error: "Projeto não encontrado" });
    } else {
      res.json(project);
    }
  },

  create: async (req: Request, res: Response) => {
    const { name, description } = req.body;
    try {
      const project = await ProjectService.createProject({ name, description });
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: "Erro ao criar projeto" });
    }
  },

  delete: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      await ProjectService.deleteProject(id);
      res.status(204).send();
    } catch {
      res.status(404).json({ error: "Projeto não encontrado" });
    }
  },
};
