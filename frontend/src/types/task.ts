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
}

export type TaskCreate = Omit<Task, "id" | "createdAt">;

export type TaskUpdate = Omit<Task, "id" | "createdAt">;
