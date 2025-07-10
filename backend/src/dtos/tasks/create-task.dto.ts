import { Type } from "class-transformer";
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateTaskDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  projectId: number;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
