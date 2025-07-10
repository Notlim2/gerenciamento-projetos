import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { PaginatedDto } from "../common/paginated.dto";

export class GetTasksDto extends PaginatedDto {
  @IsInt()
  @Min(1)
  projectId: number;

  @IsOptional()
  @IsString()
  search?: string;
}
