import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWhiteboardDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
