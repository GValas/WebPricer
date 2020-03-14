import { IsDateString, IsEnum, IsNumber } from 'class-validator'
import { ExerciseMode } from '../../../shared/enums/exercise-mode.enum'
import { VanillaType } from '../../../shared/enums/vanilla-type.enum'
export class VanillaPayoffDto {

    @IsNumber()
    readonly strike: number

    @IsDateString()
    readonly maturityDate: Date

    @IsEnum(ExerciseMode)
    readonly exerciseMode: ExerciseMode

    @IsEnum(VanillaType)
    readonly vanillaType: VanillaType
}
