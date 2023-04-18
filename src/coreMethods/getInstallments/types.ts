import type { Issuer, PayerCost, TProcessingMode } from "../util/types";

export type TInstallmentsParams = {
  locale?: string;
  amount: string;
  bin: string;
  paymentMethodId?: string,
  payment_method_id?: string,
  processingMode?: TProcessingMode;
  processing_mode?: TProcessingMode;
  paymentTypeId?: string;
  payment_type_id?: string;
}

export type TInstallments = {
  payment_method_id: string;
  payment_type_id: string;
  issuer: Issuer;
  processing_mode: string;
  merchant_account_id?: string;
  payer_costs: PayerCost[];
  agreements?: unknown;
}
