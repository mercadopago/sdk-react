import type { Issuer, PayerCost, ProcessingMode } from "../util/types";

export type InstallmentsParams = {
  locale?: string;
  amount: string;
  bin: string;
  paymentMethodId?: string,
  payment_method_id?: string,
  processingMode?: ProcessingMode;
  processing_mode?: ProcessingMode;
  paymentTypeId?: string;
  payment_type_id?: string;
}

export type Installments = {
  payment_method_id: string;
  payment_type_id: string;
  issuer: Issuer;
  processing_mode: string;
  merchant_account_id?: string;
  payer_costs: PayerCost[];
  agreements?: unknown;
}
