export type BricksBuilderType = {
  create: (param: string, param2: string, settings: {}) => void;
};

export type InstanceMercadoPagoType = {
  bricks: () => BricksBuilderType;
};

export type PaymentType = {
  onSubmit?: (param: IPaymentFormData, param2?: IAdditionalData) => Promise<void>;
  onReady?: () => void;
  onError?: (param: IBrickError) => void;
  config: {
    initialization: {
      amount: number;
      payer?: IPaymentBrickPayer;
      preferenceId?: string;
    };
    customization: {
      paymentMethods: {
        atm?: string | string[];
        ticket?: string | string[];
        bankTransfer?: string | string[];
        creditCard?: string | string[];
        debitCard?: string | string[];
        mercadoPago?: string | string[];
      };
    };
  };
};

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
  formData: ITicketFormData;
}

type TPaymentBrickPaymentType =
  | 'atm'
  | 'ticket'
  | 'bank_transfer'
  | 'creditCard'
  | 'debitCard'
  | 'wallet_purchase'
  | 'onboarding_credits';

interface ITicketFormData {
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
