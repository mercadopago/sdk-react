import type { BaseEvents, TBaseFieldsOptions, ValidityChangeArg } from "../util/types";

export type SecurityCodeMode = 'mandatory' | 'optional';

export interface ISecurityCodeOptions extends TBaseFieldsOptions {
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

export interface TSecurityCodeParams extends SecurityCodeEvents, ISecurityCodeOptions {}
