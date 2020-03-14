import { IsDefined, IsNumber, IsString, Length } from 'class-validator'

export class UnderlyingCreateDto {

    @IsDefined()
    readonly code: string

    @IsDefined()
    @IsNumber()
    readonly spot: number

    @IsDefined()
    @IsNumber()
    readonly volatility: number

    @IsDefined()
    @IsString()
    readonly currency: string
}
