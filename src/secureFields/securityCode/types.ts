import type { TBaseFieldsOptions } from "../util/types";

export interface ISecurityCodeOptions extends TBaseFieldsOptions {}

export type SecurityCodeUpdatableSettings = {
  mode: string;
  length: number;
};
