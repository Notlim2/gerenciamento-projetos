export type TaskStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELED"
  | "BLOCKED";

export interface Task {
  id: number;
  name: string;
  status: TaskStatus;
  projectId: number;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}

export type TaskCreate = Omit<
  Task,
  "id" | "status" | "createdAt" | "updatedAt"
>;

export type TaskUpdate = Omit<Task, "id" | "createdAt" | "updatedAt">;
