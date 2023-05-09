import type { BaseEvents, IDateYearFieldsOptions, ValidityChangeArg } from "../util/types";

export interface IExpirationYearOptions extends IDateYearFieldsOptions {}

export interface ExpirationYearEvents extends BaseEvents {
  onValidityChange?: (arg: ValidityChangeArg<'expirationYear'>) => void;
}

export interface TExpirationYearParams extends ExpirationYearEvents, IExpirationYearOptions {}
