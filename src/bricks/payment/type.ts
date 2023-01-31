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
         * Payment by printed ticket.
         *
         * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/other-payment-methods/brasil Consult ticket use} documentation.
         * */
        ticket?: string | string[];
        /**
         * Payment by Pix, an instant electronic payment method offered by the Central Bank of Brazil to individuals and legal entities.
         *
         * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/pix Consult bankTransfer use} documentation.
         * */
        bankTransfer?: string | string[];
        /**
         * Payment by creditCard.
         *
         * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/cards Consult creditCard use} documentation.
         * */
        creditCard?: string | string[];
        /**
         * Payment by debitCard.
         *
         * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/cards Consult debitCard use} documentation.
         * */
        debitCard?: string | string[];
        /**
         * Payment with Mercado Pago Wallet and Installments without card.
         *
         * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/wallet-credits Consult mercadoPago use} documentation.
         * */
        mercadoPago?: string | string[];
      };
    };
  };
};

interface IPaymentBrickPayer {
  /**
   * Payer data that can start already filled in.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   * */
  firstName?: string;
  /**
   * Payer data that can start already filled in.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   * */
  lastName?: string;
  /**
   * Payer data that can start already filled in.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   * */
  address?: IAddress;
  /**
   * Necessary payer data to display saved cards of a given buyer.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/customers-cards Data customization} documentation.
   * */
  customerId?: string;
  /**
   * Necessary payer data to display saved cards of a given buyer.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/customers-cards Data customization} documentation.
   * */
  cardsIds?: string[];
}

interface IAddress {
  /**
   * Payer zip code that can start already filled in.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   * */
  zipCode?: string;
  /**
   * Payer federal unit that can start already filled in.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   * */
  federalUnit?: string;
  /**
   * Payer city that can start already filled in.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   * */
  city?: string;
  /**
   * Payer neighborhood that can start already filled in.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   * */
  neighborhood?: string;
  /**
   * Payer street name that can start already filled in.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   * */
  streetName?: string;
  /**
   * Payer street number that can start already filled in.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   * */
  streetNumber?: number;
  /**
   * Payer complement that can start already filled in.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   * */
  complement?: string;
}

interface IPaymentFormData {
  /**
   * Payment type returned at onSubmit.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/payment-submission/other-payment-methods/brasil Returned data} documentation.
   * */
  paymentType: TPaymentBrickPaymentType
  /**
   * Selected payment method returned at onSubmit.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/payment-submission/other-payment-methods/brasil Returned data} documentation.
   * */;
  selectedPaymentMethod: TPaymentBrickPaymentType;
  /**
   * Information returned at onSubmit.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/payment-submission/other-payment-methods/brasil Returned data} documentation.
   * */
  formData: ITicketFormData;
}

type TPaymentBrickPaymentType =
  /**
   * Payment by ATM (Automatic Teller Machine).
   *
   * @tutorial {@link https://www.mercadopago.com.mx/developers/en/docs/checkout-bricks/payment-brick/code-example/other-payment-methods/mexico Consult ATM use} documentation.
   * */
  | 'atm'
  /**
   * Payment by printed ticket.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/other-payment-methods/brasil Consult ticket use} documentation.
   * */
  | 'ticket'
  /**
   * Payment by Pix, an instant electronic payment method offered by the Central Bank of Brazil to individuals and legal entities.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/pix Consult bankTransfer use} documentation.
   * */
  | 'bank_transfer'
  /**
   * Payment with creditCard.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/cards Consult debitCard use} documentation.
   * */
  | 'creditCard'
  /**
   * Payment with debitCard.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/cards Consult debitCard use} documentation.
   * */
  | 'debitCard'
  /**
   * Payment with Mercado Pago Wallet.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/wallet-credits Consult mercadoPago use} documentation.
   * */
  | 'wallet_purchase'
  /**
   * Payment with Mercado Credits.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/wallet-credits Consult mercadoPago use} documentation.
   * */
  | 'onboarding_credits';

interface ITicketFormData {
  /**
   * Product cost.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/reference/payments/_payments/post Consult Ticket data} documentation.
   * */
  transaction_amount: number;
  /**
   * Indicates the identifier of the payment method selected to make the transaction.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/reference/payments/_payments/post Consult Ticket data} documentation.
   * */
  payment_method_id: string;
  /**
   * Data set that identify buyer.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/reference/payments/_payments/post Consult Ticket data} documentation.
   * */
  payer: IPayerAPI;
}

interface IPayerAPI {
  /**
   * Email associated with the payer.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/reference/payments/_payments/post Consult Payer data} documentation.
   * */
  email: string;
  /**
   * Personal identification of associated payer.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/reference/payments/_payments/post Consult Payer data} documentation.
   * */
  identification: IPayerIdentification;
  /**
   * First name of the associated payer.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/reference/payments/_payments/post Consult Payer data} documentation.
   * */
  first_name: string;
  /**
   * Last name of the associated payer.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/reference/payments/_payments/post Consult Payer data} documentation.
   * */
  last_name: string;
  /**
   * Address of the associated payer.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/reference/payments/_payments/post Consult Payer data} documentation.
   * */
  address: IPayerAddressAPI;
}

interface IPayerAddressAPI {
  /**
   * Zip code of the associated payer.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Consult Payer address} documentation.
   * */
  zip_code: string;
  /**
   * Federal unit of the associated payer.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Consult Payer address} documentation.
   * */
  federal_unit: string;
  /**
   * City of the associated payer.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Consult Payer address} documentation.
   * */
  city: string;
  /**
   * Neighborhood code of the associated payer.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Consult Payer address} documentation.
   * */
  neighborhood: string;
  /**
   * Street name code of the associated payer.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Consult Payer address} documentation.
   * */
  street_name: string;
  /**
   * Street number code of the associated payer.
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Consult Payer address} documentation.
   * */
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
