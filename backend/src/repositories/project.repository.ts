import { prisma } from "../prisma/client";
import { CreateProjectDto } from "../dtos/projects/create-project.dto";
import { UpdateProjectDto } from "../dtos/projects/update-project.dto";
import { GetProjectsDto } from "../dtos/projects/get-projects.dto";

export const ProjectRepository = {
  getAll: async (filters: GetProjectsDto) => {
    const { search, skip, take } = filters;
    const options = { skip, take };
    const where = {
      ...(search
        ? {
            OR: [
              { name: { contains: filters.search } },
              { description: { contains: filters.search } },
            ],
          }
        : {}),
    };
    const items = await prisma.project.findMany({
      where,
      ...options,
    });
    const count = await prisma.project.count({ where });
    return { items, count };
  },

  getById: (id: number) => prisma.project.findUnique({ where: { id } }),

  create: (data: CreateProjectDto) =>
    prisma.project.create({ data: { ...data, createdAt: new Date() } }),

  update: (id: number, data: UpdateProjectDto) =>
    prisma.project.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    }),

  delete: (id: number) => prisma.project.delete({ where: { id } }),
};
