import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class IdDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  id: number;
}
