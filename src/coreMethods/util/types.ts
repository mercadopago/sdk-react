export type TProcessingMode = "gateway" | "aggregator";

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
