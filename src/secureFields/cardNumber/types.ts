import type { BaseEvents, BinChangeArg, BaseFieldsOptions, ValidityChangeArg } from "../util/types";

export interface CardNumberOptions extends BaseFieldsOptions {
  enableLuhnValidation?: boolean;
  length?: number;
}

export type CardNumberUpdatableSettings = {
  length?: number;
  validation?: string;
};

export interface CardNumberEvents extends BaseEvents {
  onValidityChange?: (arg: ValidityChangeArg<'cardNumber'>) => void;

  /** Triggered when bin state changes from invalid to valid or from valid to invalid. It returns the bin when valid or null when invalid */
  onBinChange?: (arg: BinChangeArg) => void;
}

export interface CardNumberParams extends CardNumberEvents, CardNumberOptions {}
