import type { BaseEvents, BinChangeArg, TBaseFieldsOptions, ValidityChangeArg } from "../util/types";

export interface ICardNumberOptions extends TBaseFieldsOptions {
  enableLuhnValidation?: boolean;
  length?: number;
}

export type CardNumberUpdatableSettings = {
  length?: number;
  validation?: string;
};

export interface CardNumberEvents extends BaseEvents {
  onValidityChange?: (arg: ValidityChangeArg<'cardNumber'>) => void;
  onBinChange?: (arg: BinChangeArg) => void;
}

export interface TCardNumberParams extends CardNumberEvents, ICardNumberOptions {}
