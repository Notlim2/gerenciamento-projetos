import { prisma } from "../prisma/client";
import { Project } from "../generated/prisma";

export const ProjectRepository = {
  getAll: () => prisma.project.findMany(),

  getById: (id: number) => prisma.project.findUnique({ where: { id } }),

  create: (data: Omit<Project, "id">) => prisma.project.create({ data }),

  delete: (id: number) => prisma.project.delete({ where: { id } }),
};
