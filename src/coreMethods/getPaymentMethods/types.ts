import type { Issuer, PayerCost, ProcessingMode } from "../util/types";

export type PaymentMethodsParams = {
  bin: string;
  processingMode?: ProcessingMode
}

export interface FinancingDeals {
  legals?: unknown;
  installments?: unknown;
  expiration_date?: unknown;
  start_date?: unknown;
  status: string;
}

export interface SecurityCode {
  mode: string;
  length: number;
}

export interface CardNumber {
  length: number;
  validation: string;
}

export interface Bin {
  pattern: string;
  installments_pattern: string;
  exclusion_pattern: string;
}

export interface Setting {
  security_code: SecurityCode;
  card_number: CardNumber;
  bin: Bin;
}

export interface Result {
  financial_institutions: unknown[];
  secure_thumbnail: string;
  payer_costs: PayerCost[];
  issuer: Issuer;
  total_financial_cost?: unknown;
  min_accreditation_days: number;
  max_accreditation_days: number;
  merchant_account_id: string;
  id: string;
  payment_type_id: string;
  accreditation_time: number;
  thumbnail: string;
  bins: unknown[];
  marketplace: string;
  deferred_capture: string;
  agreements: unknown[];
  labels: string[];
  financing_deals: FinancingDeals;
  name: string;
  site_id: string;
  processing_mode: string;
  additional_info_needed: string[];
  status: string;
  settings: Setting[];
}

export interface Paging {
  total: number;
  limit: number;
  offset: number;
}

export type PaymentMethods = {
  paging: Paging;
  results: Result[];
}