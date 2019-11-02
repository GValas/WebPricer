import { IsNumber, Length } from 'class-validator';

export class CreateCurrencyDto {

    @Length(3, 3)
    readonly code: string;

    @IsNumber()
    readonly rate: number;
}
