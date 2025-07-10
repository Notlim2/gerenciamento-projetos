import { IsOptional, IsString } from "class-validator";
import { PaginatedDto } from "../common/paginated.dto";

export class GetProjectsDto extends PaginatedDto {
  @IsOptional()
  @IsString()
  search?: string;
}
