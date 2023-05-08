import type { BaseEvents, TBaseFieldsOptions, ValidityChangeArg } from "../util/types";

export interface IExpirationMonthOptions extends TBaseFieldsOptions {}

export interface ExpirationMonthEvents extends BaseEvents {
  onValidityChange?: (arg: ValidityChangeArg<'expirationMonth'>) => void;
}

export interface TExpirationMonthParams extends ExpirationMonthEvents, IExpirationMonthOptions {}
