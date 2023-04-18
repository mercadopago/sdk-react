export type TIssuersParams = {
  payment_method_id?: string,
  paymentMethodId?: string,
  bin: string
}

export type TIssuers = { 
  id: string;
  name: string;
  secure_thumbnail: string;
  thumbnail: string;
  processing_mode: string;
  merchant_account_id: string;
}