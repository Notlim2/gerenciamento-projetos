import { Task } from "@prisma/client";
import { prisma } from "../prisma/client";

export const TaskRepository = {
  getAll: () => prisma.task.findMany(),

  getById: (id: number) => prisma.task.findUnique({ where: { id } }),

  create: (data: Omit<Task, "id" | "done">) =>
    prisma.task.create({ data: { ...data, done: false } }),

  delete: (id: number) => prisma.task.delete({ where: { id } }),
};
