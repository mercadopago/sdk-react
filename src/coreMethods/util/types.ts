export type ProcessingMode = "gateway" | "aggregator";

export interface Issuer {
  default: boolean;
  name: string;
  id: number;
}

export interface PayerCost {
  installment_rate: number;
  discount_rate: number;
  min_allowed_amount: number;
  labels: string[];
  installments: number;
  reimbursement_rate?: unknown;
  max_allowed_amount: number;
  payment_method_option_id: string;
}

export type Identification = {
  number: string;
  type: string;
}

export type Cardholder = {
  identification: Identification;
  name: string;
}

export type CardToken = {
  id: string;
  public_key: string;
  card_id?: unknown;
  luhn_validation: boolean;
  status: string;
  date_used?: unknown;
  card_number_length: number;
  date_created: Date;
  first_six_digits: string;
  last_four_digits: string;
  security_code_length: number;
  expiration_month: number;
  expiration_year: number;
  date_last_updated: Date;
  date_due: Date;
  live_mode: boolean;
  cardholder: Cardholder;
}
