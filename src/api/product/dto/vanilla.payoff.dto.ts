import { IsDate, IsString, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { VanillaPayoff, ExerciseMode, VanillaType } from '../../../shared/models/payoff.vanilla.model';
export class VanillaPayoffDto implements VanillaPayoff {

    @IsNumber()
    readonly strike: number;

    @IsDateString()
    readonly maturityDate: Date;

    @IsString()
    readonly exerciseMode: ExerciseMode;

    @IsEnum(VanillaType)
    readonly vanillaType: VanillaType;
}
