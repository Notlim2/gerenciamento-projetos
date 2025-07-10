import { IsEnum } from "class-validator";
import { CreateTaskDto } from "./create-task.dto";
import { TaskStatus } from "@prisma/client";

export class UpdateTaskDto extends CreateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
