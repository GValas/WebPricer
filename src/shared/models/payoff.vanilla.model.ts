export interface VanillaPayoff {
  strike: number;
  maturityDate: Date;
  exerciseMode: ExerciseMode;
  vanillaType: VanillaType;
}

export enum VanillaType {
  Call = 'call',
  Put = 'put',
}

export enum ExerciseMode {
  European = 'european',
  American = 'american',
}
