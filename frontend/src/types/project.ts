export interface Project {
  id: number;
  name: string;
  description?: string;
  done: boolean;
  createdAt: string;
}

export type ProjectCreate = Omit<Project, "id" | "createdAt" | "done">;

export type ProjectUpdate = Omit<Project, "id" | "createdAt">;
