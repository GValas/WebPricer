import { ValidateNested, IsEnum, IsUUID, IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { VanillaPayoffDto } from './vanilla-payoff-create.dto';

export class ProductCreateDto {

  @IsNumber()
  readonly quantity: number;

  @IsString()
  readonly underlying: string;

  @IsString()
  readonly quantoCurrency: string;

  @ValidateNested()
  @Type(() => VanillaPayoffDto)
  readonly payoff: VanillaPayoffDto;

}
