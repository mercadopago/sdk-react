interface IPaymentBrickPayer {
  firstName?: string;
  lastName?: string;
  address?: IAddress;
  customerId?: string;
  cardsIds?: string[];
}

interface IAddress {
  zipCode?: string;
  federalUnit?: string;
  city?: string;
  neighborhood?: string;
  streetName?: string;
  streetNumber?: number;
  complement?: string;
}

interface IPaymentFormData {
  paymentType: TPaymentBrickPaymentType;
  selectedPaymentMethod: TPaymentBrickPaymentType;
  formData: TicketFormData;
}

type TPaymentBrickPaymentType =
  | 'atm'
  | 'ticket'
  | 'bank_transfer'
  | 'creditCard'
  | 'debitCard'
  | 'wallet_purchase'
  | 'onboarding_credits';

interface TicketFormData {
  transaction_amount: number;
  payment_method_id: string;
  payer: IPayerAPI;
}

interface IPayerAPI {
  email: string;
  identification: IPayerIdentification;
  first_name: string;
  last_name: string;
  address: IPayerAddressAPI;
}

interface IPayerAddressAPI {
  zip_code: string;
  federal_unit: string;
  city: string;
  neighborhood: string;
  street_name: string;
  street_number: number;
}

interface IAdditionalData {
  bin: string;
}

interface IBrickError {
  type: 'non_critical' | 'critical';
  cause: string;
  message: string;
}
