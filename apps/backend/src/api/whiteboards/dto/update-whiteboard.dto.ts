import { IsOptional, IsString } from 'class-validator';

export class UpdateWhiteboardDto {
  @IsOptional()
  @IsString()
  name?: string;
}
