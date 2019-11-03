import { IsNumber, Length, IsDefined } from 'class-validator';

export class CurrencyCreateDto {

    @IsDefined()
    @Length(3, 3)
    readonly code: string;

    @IsDefined()
    @IsNumber()
    readonly rate: number;
}
