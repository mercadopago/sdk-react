import type { TBaseFieldsOptions } from "../util/types";

export interface ICardNumberOptions extends TBaseFieldsOptions {
  enableLuhnValidation?: boolean;  
}

export type CardNumberUpdatableSettings = {
  length: number;
  validation: string;
};
