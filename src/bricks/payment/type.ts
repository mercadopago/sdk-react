import { IBrickError, IPayerIdentification } from '../util/types/common';

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
    /**
     * An object containing initialization options.
     */
    initialization: {
      /**
       * Total amount to be paid by all means of payment with the exception of the Mercado Pago Wallet, which has its processing value determined in the backend through the "preferenceId".
       *
       * @see {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/code-example/all-payment-methods Data customization} documentation.
       */
      amount: number;
      /**
       * to do.
       */
      payer?: IPaymentBrickPayer;
      /**
       * Automatically unique ID generated in backend that identifies the preference. For example 036151801-2484cd71-7140-4c51-985a-d4cfcf133baf
       *
       * @tutorial {@link https://www.mercadopago.com.br/developers/en/reference/preferences/_checkout_preferences/post Create preference} documentation.
       * */
      preferenceId?: string;
    };
    /**
     * An object containing customization options.
     */
    customization: {
      /**
       * All payment methods available for integration with Payment Brick.
       *
       * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/additional-content/consult-payment-methods Consult payment methods} documentation.
       * */
      paymentMethods: {
        /**
         * Payment by ATM (Automatic Teller Machine).
         *
         * @tutorial {@link https://www.mercadopago.com.mx/developers/en/docs/checkout-bricks/payment-brick/code-example/other-payment-methods/mexico Consult ATM use} documentation.
         * */
        atm?: string | string[];
        /**
         * Payment by ticket.
         *
         * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/other-payment-methods/brasil Consult ticket use} documentation.
         * */
        ticket?: string | string[];
        /**
         * to do.
         */
        bankTransfer?: string | string[];
        /**
         * to do.
         */
        creditCard?: string | string[];
        /**
         * to do.
         */
        debitCard?: string | string[];
        /**
         * to do.
         */
        mercadoPago?: string | string[];
      };
    };
  };
};

interface IPaymentBrickPayer {
  // https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks
  firstName?: string;
  lastName?: string;
  address?: IAddress;
  // https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/customers-cards
  customerId?: string;
  // https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/customers-cards
  cardsIds?: string[];
}

// https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks
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
  /**
   * Bin of the card entered by the user.
   *
   * @see {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/additional-data additional data customization} documentation.
   */
  bin: string;
}
