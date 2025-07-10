import { Task } from "@prisma/client";
import { TaskRepository } from "../repositories/task.repository";
import { GetTasksDto } from "../dtos/tasks/get-tasks.dto";
import { CreateTaskDto } from "../dtos/tasks/create-task.dto";
import { UpdateTaskDto } from "../dtos/tasks/update-task.dto";

export const TaskService = {
  listTasks: (filters: GetTasksDto) => TaskRepository.getAll(filters),

  getTask: (id: number) => TaskRepository.getById(id),

  createTask: (task: CreateTaskDto) => TaskRepository.create(task),

  updateTask: (id: number, task: UpdateTaskDto) =>
    TaskRepository.update(id, task),

  deleteTask: (id: number) => TaskRepository.delete(id),
};
