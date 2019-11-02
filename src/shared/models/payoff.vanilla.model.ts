import { ExerciseMode } from './exercise-mode';
import { VanillaType } from './vanilla-type';

export interface VanillaPayoff {
  strike: number;
  maturityDate: Date;
  exerciseMode: ExerciseMode;
  vanillaType: VanillaType;
}
