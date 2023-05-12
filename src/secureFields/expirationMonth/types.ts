import type { BaseEvents, BaseFieldsOptions, ValidityChangeArg } from "../util/types";

export interface ExpirationMonthOptions extends BaseFieldsOptions {}

export interface ExpirationMonthEvents extends BaseEvents {
  onValidityChange?: (arg: ValidityChangeArg<'expirationMonth'>) => void;
}

export interface ExpirationMonthParams extends ExpirationMonthEvents, ExpirationMonthOptions {}
