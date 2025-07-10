import { TaskStatus } from "@prisma/client";
import { prisma } from "../prisma/client";
import { GetTasksDto } from "../dtos/tasks/get-tasks.dto";
import { CreateTaskDto } from "../dtos/tasks/create-task.dto";
import { UpdateTaskDto } from "../dtos/tasks/update-task.dto";

export const TaskRepository = {
  getAll: async (filters: GetTasksDto) => {
    const { projectId, search, skip, take } = filters;
    const where = {
      projectId,
      ...(search
        ? {
            OR: [
              {
                name: { contains: search },
                description: { contains: search },
              },
            ],
          }
        : {}),
    };
    const options = { skip, take };
    const items = await prisma.task.findMany({
      where,
      ...options,
    });
    const count = await prisma.task.count({ where });
    return { items, count };
  },

  getById: (id: number) => prisma.task.findUnique({ where: { id } }),

  update: (id: number, data: UpdateTaskDto) =>
    prisma.task.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    }),

  create: (data: CreateTaskDto) =>
    prisma.task.create({
      data: { ...data, status: TaskStatus.PENDING, createdAt: new Date() },
    }),

  delete: (id: number) => prisma.task.delete({ where: { id } }),
};
