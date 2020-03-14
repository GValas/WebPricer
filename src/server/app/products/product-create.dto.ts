import { Type } from 'class-transformer'
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'
import { VanillaPayoffDto } from './vanilla-payoff-create.dto'

export class ProductCreateDto {

  @IsNumber()
  readonly quantity: number

  @IsString()
  readonly underlying: string

  @IsString()
  readonly quantoCurrency: string

  @ValidateNested()
  @Type(() => VanillaPayoffDto)
  readonly payoff: VanillaPayoffDto

}
