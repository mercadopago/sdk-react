import type { BaseEvents, ExpirationYearMode, IDateYearFieldsOptions, ValidityChangeArg } from "../util/types";

export interface IExpirationDateOptions extends IDateYearFieldsOptions {}

export interface ExpirationDateEvents extends BaseEvents {
  onValidityChange?: (arg: ValidityChangeArg<'expirationDate'>) => void;
}

export interface TExpirationDateParams extends ExpirationDateEvents, IExpirationDateOptions {}
