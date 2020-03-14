import { ExerciseMode } from '../enums/exercise-mode.enum'
import { VanillaType } from '../enums/vanilla-type.enum'

export interface IVanillaPayoff {
    readonly strike: number
    readonly maturityDate: Date
    readonly exerciseMode: ExerciseMode
    readonly vanillaType: VanillaType
}
