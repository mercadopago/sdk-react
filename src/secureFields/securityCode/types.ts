import type { BaseEvents, BaseFieldsOptions, ValidityChangeArg } from "../util/types";

export type SecurityCodeMode = 'mandatory' | 'optional';

export interface SecurityCodeOptions extends BaseFieldsOptions {
  mode?: SecurityCodeMode
  length?: number;
}

export type SecurityCodeUpdatableSettings = {
  mode: SecurityCodeMode;
  length: number;
};

export interface SecurityCodeEvents extends BaseEvents {
  onValidityChange?: (arg: ValidityChangeArg<'securityCode'>) => void;
}

export interface SecurityCodeParams extends SecurityCodeEvents, SecurityCodeOptions {}
