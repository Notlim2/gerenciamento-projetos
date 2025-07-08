import { Project } from "@prisma/client";
import { prisma } from "../prisma/client";

export const ProjectRepository = {
  getAll: () => prisma.project.findMany(),

  getById: (id: number) => prisma.project.findUnique({ where: { id } }),

  create: (data: Omit<Project, "id">) => prisma.project.create({ data }),

  delete: (id: number) => prisma.project.delete({ where: { id } }),
};
