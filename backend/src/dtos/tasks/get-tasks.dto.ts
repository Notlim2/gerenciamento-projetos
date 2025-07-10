import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { PaginatedDto } from "../common/paginated.dto";
import { Type } from "class-transformer";

export class GetTasksDto extends PaginatedDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  projectId: number;

  @IsOptional()
  @IsString()
  search?: string;
}
