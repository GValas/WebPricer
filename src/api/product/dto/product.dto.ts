import { Product } from '../../../shared/models/product.model';
import { ValidateNested, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { VanillaPayoffDto } from './vanilla.payoff.dto';
import { Type } from 'class-transformer';
import { CurrencyCode } from '../../../shared/models/currency.model';
import { UnderlyingCode } from '../../../shared/models/underlying.model';

export class ProductDto implements Product {

  @IsUUID()
  @IsOptional()
  readonly id: string;

  readonly quantity: number;

  @IsEnum(UnderlyingCode)
  readonly underlying: UnderlyingCode;

  @IsEnum(CurrencyCode)
  readonly quantoCurrency: CurrencyCode;

  @ValidateNested()
  @Type(() => VanillaPayoffDto)
  readonly payoff: VanillaPayoffDto;

}
