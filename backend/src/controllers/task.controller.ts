import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

export const TaskController = {
  getAll: async (req: Request, res: Response) => {
    const tasks = await TaskService.listTasks(res.locals.validated.query);
    res.json(tasks);
  },

  getById: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const task = await TaskService.getTask(id);
    if (!task) {
      res.status(404).json({ error: "Tarefa não encontrada" });
    } else {
      res.json(task);
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const task = await TaskService.createTask(res.locals.validated.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: "Erro ao criar tarefa" });
    }
  },

  update: async (req: Request, res: Response) => {
    const { id } = res.locals.validated.params;
    try {
      const task = await TaskService.updateTask(id, res.locals.validated.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: "Erro ao editar tarefa" });
    }
  },

  delete: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      await TaskService.deleteTask(id);
      res.status(204).send();
    } catch {
      res.status(404).json({ error: "Tarefa não encontrada" });
    }
  },
};
