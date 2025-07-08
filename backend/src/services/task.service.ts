import { Task } from "@prisma/client";
import { TaskRepository } from "../repositories/task.repository";

export const TaskService = {
  listTasks: () => TaskRepository.getAll(),

  getTask: (id: number) => TaskRepository.getById(id),

  createTask: (task: Omit<Task, "id" | "done">) => TaskRepository.create(task),

  deleteTask: (id: number) => TaskRepository.delete(id),
};
