import type { BaseEvents, DateYearFieldsOptions, ValidityChangeArg } from "../util/types";

export interface ExpirationYearOptions extends DateYearFieldsOptions {}

export interface ExpirationYearEvents extends BaseEvents {
  onValidityChange?: (arg: ValidityChangeArg<'expirationYear'>) => void;
}

export interface ExpirationYearParams extends ExpirationYearEvents, ExpirationYearOptions {}
