import { Type } from "class-transformer";
import { IsNumber, Max, Min } from "class-validator";

export class PaginatedDto {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  skip: number;

  @IsNumber()
  @Min(10)
  @Max(100)
  @Type(() => Number)
  take: number;
}
