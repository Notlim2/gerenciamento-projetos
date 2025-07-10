import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateTaskDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  projectId: number;

  @IsString()
  @Min(2)
  @Max(255)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
