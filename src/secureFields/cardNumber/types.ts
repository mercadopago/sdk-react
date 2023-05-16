import type { BaseEvents, BinChangeArg, BaseFieldsOptions, ValidityChangeArg } from "../util/types";

export interface CardNumberOptions extends BaseFieldsOptions {
  /** Defines whether the card number will be validated by Luhn validation */
  enableLuhnValidation?: boolean;
  /** Number of digits allowed by the input */
  length?: number;
}

export type CardNumberUpdatableSettings = {
  /** Number of digits allowed by the input */
  length?: number;
  /** Indicates whether the card numbers are standardized numbers or not */
  validation?: 'standard' | 'none';
};

export interface CardNumberEvents extends BaseEvents {
  onValidityChange?: (arg: ValidityChangeArg<'cardNumber'>) => void;

  /** Triggered when bin state changes from invalid to valid or from valid to invalid. It returns the bin when valid or null when invalid */
  onBinChange?: (arg: BinChangeArg) => void;
}

export interface CardNumberParams extends CardNumberEvents, CardNumberOptions {}
