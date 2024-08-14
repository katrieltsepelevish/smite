import {
  IsNotEmpty,
  IsString,
  IsObject,
  ValidateNested,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly whiteboardId: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PositionDto)
  readonly position: PositionDto;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

class PositionDto {
  @IsNotEmpty()
  @IsNumber()
  readonly x: number;

  @IsNotEmpty()
  @IsNumber()
  readonly y: number;
}
