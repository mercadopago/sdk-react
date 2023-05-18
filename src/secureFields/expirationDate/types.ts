import type { BaseEvents, DateYearFieldsOptions, ValidityChangeArg } from "../util/types";

export interface ExpirationDateOptions extends DateYearFieldsOptions {}

export interface ExpirationDateEvents extends BaseEvents {
  onValidityChange?: (arg: ValidityChangeArg<'expirationDate'>) => void;
}

export interface ExpirationDateParams extends ExpirationDateEvents, ExpirationDateOptions {}
