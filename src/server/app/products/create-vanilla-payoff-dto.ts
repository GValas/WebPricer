import { IsEnum, IsNumber, IsDateString } from 'class-validator';
import { ExerciseMode } from '../../../shared/models/exercise-mode';
import { VanillaType } from '../../../shared/models/vanilla-type';
export class VanillaPayoffDto {

    @IsNumber()
    readonly strike: number;

    @IsDateString()
    readonly maturityDate: Date;

    @IsEnum(ExerciseMode)
    readonly exerciseMode: ExerciseMode;

    @IsEnum(VanillaType)
    readonly vanillaType: VanillaType;
}
