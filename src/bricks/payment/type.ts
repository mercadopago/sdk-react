import {
  ICardPaymentBrickPayer,
  ICardPaymentBrickVisual,
  ICardPaymentFormData,
} from '../cardPayment/type';
import {
  IBrickStyle,
  IBrickCustomVariables,
  IBrickError,
  IPayerIdentification,
  IBrickVisual,
} from '../util/types/common';

export type BricksBuilderType = {
  create: (param: string, param2: string, settings: {}) => void;
};

export type InstanceMercadoPagoType = {
  bricks: () => BricksBuilderType;
};

export type TPaymentType = {
  onSubmit: (param: IPaymentFormData, param2?: IAdditionalData) => Promise<unknown>;
  onReady?: () => void;
  onError?: (param: IBrickError) => void;
  onBinChange?: (param: string) => void;
  /**
   * An object containing initialization options.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/code-example/all-payment-methods Data customization} documentation.
   */
  initialization: {
    /**
     * Total amount to be paid by all means of payment with the exception of the Mercado Pago Wallet, which has its processing value determined in the backend through the "preferenceId".
     *
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/code-example/all-payment-methods Data customization} documentation.
     */
    amount: number;
    /**
     * Payer data that can start already filled in.
     *
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
     */
    payer?: IPaymentBrickPayer;
    /**
     * Automatically unique ID generated in backend that identifies the preference. For example: 036151801-2484cd71-7140-4c51-985a-d4cfcf133baf
     *
     * @tutorial {@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences/post Create preference} documentation.
     */
    preferenceId?: string;
  };
  /**
   * An object containing customization options.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/configure-integration/other-payment-methods/brasil Data customization} documentation.
   */
  customization: IPaymentBrickCustomization;
};

interface IPaymentFormData {
  /**
   * Payment type returned at onSubmit.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/other-payment-methods/brasil Returned data} documentation.
   */
  paymentType: TPaymentBrickPaymentType;
  /**
   * Selected payment method returned at onSubmit.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/other-payment-methods/brasil Returned data} documentation.
   */
  selectedPaymentMethod: TPaymentBrickPaymentType;
  /**
   * Information returned at onSubmit.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/other-payment-methods/brasil Returned data} documentation.
   */
  formData: ICardPaymentFormData<ICardPaymentBrickPayer> &
    ICardPaymentFormData<ISavedCardPayer> &
    TicketFormData;
  /**
   * Bin of the card entered by the user.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/additional-data additional data customization} documentation.
   */
  additionalData?: IAdditionalData;
}

interface ISavedCardPayer {
  type: string;
  id: string;
}

interface TicketFormData {
  /**
   * Ticket transaction amount.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
   */
  transaction_amount: number;
  /**
   * Ticket payment method id.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
   */
  payment_method_id: string;
  /**
   * Ticket payer data.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
   */
  payer: IPayerAPI;
}

interface IPaymentBrickCustomization {
  /**
   * Control the visual aspects of the brick.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
   */
  visual?: TPaymentBrickVisual;
  /**
   * Configuration of wich payment methods will be accepted
   *
   * @see {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/other-payment-methods/brasil Customizable data} documentation.
   */
  paymentMethods: TPaymentBrickPaymentMethods;
}

/**
 * Control the visual aspects of the brick.
 *
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
 */
type TPaymentBrickVisual = IPaymentBrickBaseVisual & IPaymentBrickVisual;

/**
 * Control the visual aspects of the brick.
 *
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
 */
interface IPaymentBrickBaseVisual
  extends IBrickVisual<IPaymentBrickCustomizableTexts, IPaymentBrickStyle>,
    ICardPaymentBrickVisual {}

interface IPaymentBrickVisual {
  /**
   * Hide redirection panel.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
   */
  hideRedirectionPanel?: boolean;
  /**
   * Preserve saved cards order.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
   */
  preserveSavedCardsOrder?: boolean;
  /**
   * Preserve saved cards order.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
   */
  defaultPaymentOption?: {
    /**
     * Form loads with credit card selected
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
     */
    creditCardForm?: boolean;
    /**
     * Form loads with debit card selected
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
     */
    debitCardForm?: boolean;
    /**
     * Form loads with saved card
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
     */
    savedCardForm?: string;
    /**
     * Form loads with ticket selected 
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
     */
    ticketForm?: boolean;
    /**
     * Form loads bank transfer selected
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
     */
    bankTransferForm?: boolean;
    /**
     * Form loads with Mercado Pago Wallet selected.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
     */
    walletForm?: boolean;
    /**
     * Form loads with Mercado Pago Credits selected.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md additional data customization} documentation.
     */
    creditForm?: boolean;
  };
}

/**
 * Configuration of wich payment methods will be accepted
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/other-payment-methods/brasil Customizable data} documentation.
 */
type TPaymentBrickPaymentMethods = IPaymentBrickPaymentMethods &
  (
    | { creditCard: AllOrArray }
    | { debitCard: AllOrArray }
    | { ticket: AllOrArray }
    | { bankTransfer: AllOrArray }
    | { atm: AllOrArray }
    | { mercadoPago: AllOrArray }
  );

type AllOrArray = 'all' | string[];

interface IPaymentBrickPaymentMethods {
  /**
   * Maximum number of customizable installments
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customizable data} documentation.
   */
  maxInstallments?: number;
  /**
   * Minimum number of customizable installments
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customizable data} documentation.
   */
  minInstallments?: number;
  /**
   * Define which payment methods will be accepted or not.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customizable data} documentation.
   */
  types?: {
    /**
     * Define which payment methods will not be accepted.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customizable data} documentation.
     */
    excluded?: TPaymentBrickPaymentType[];
    /**
     * Define which payment methods will be accepted.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customizable data} documentation.
     */
    included?: TPaymentBrickPaymentType[];
  };
}

interface ILabelPlaceholder {
  /**
   * Custom texts
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customizable data} documentation.
   */
  label?: string;
  placeholder?: string;
}

interface IPaymentBrickCustomizableTexts {
  /**
   * Custom payer first name
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md  Customizable data} documentation.
   */
  payerFirstName?: ILabelPlaceholder;
  /**
   * Custom payer last name
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customizable data} documentation.
   */
  payerLastName?: ILabelPlaceholder;
  /**
   * Custom payer zip code
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customizable data} documentation.
   */
  zipCode?: ILabelPlaceholder;
  /**
   * Custom payer state
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customizable data} documentation.
   */
  addressState?: ILabelPlaceholder;
  /**
   * Custom address city
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customizable data} documentation.
   */
  addressCity?: ILabelPlaceholder;
  /**
   * Custom address neighborhood
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customizable data} documentation.
   */
  addressNeighborhood?: ILabelPlaceholder;
  /**
   * Custom address street
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customizable data} documentation.
   */
  addressStreet?: ILabelPlaceholder;
  /**
   * Custom address number
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customizable data} documentation.
   */
  addressNumber?: { label?: string };
  /**
   * Custom address complement
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customizable data} documentation.
   */
  addressComplement?: { label?: string };
}

interface IPaymentBrickStyle extends IBrickStyle<IPaymentBrickCustomVariables> {}

interface IPaymentBrickCustomVariables extends IBrickCustomVariables {
  /**
   * Custom variable
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Consult Payer data} documentation.
   */
  secondaryColor?: string;
}

interface IPaymentBrickPayer extends ICardPaymentBrickPayer {
  /**
   * Payer first name that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   */
  firstName?: string;
  /**
   * Payer last name that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   */
  lastName?: string;
  /**
   * Payer data that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   */
  address?: IAddress;
  /**
   * Necessary payer data to display saved cards of a given buyer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/customers-cards Data customization} documentation.
   */
  customerId?: string;
  /**
   * Necessary payer data to display saved cards of a given buyer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/customers-cards Data customization} documentation.
   */
  cardsIds?: string[];
}

interface IAddress {
  /**
   * Payer zip code that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   */
  zipCode?: string;
  /**
   * Payer federal unit that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   */
  federalUnit?: string;
  /**
   * Payer city that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   */
  city?: string;
  /**
   * Payer neighborhood that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   */
  neighborhood?: string;
  /**
   * Payer street name that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   */
  streetName?: string;
  /**
   * Payer street number that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   */
  streetNumber?: number;
  /**
   * Payer complement that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Data customization} documentation.
   */
  complement?: string;
}

/**
 * Payment types.
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/cards Cards type documentation}
 * @see {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/wallet-credits Mercado Pago Wallet and Installments without card documentation},
 * @see {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/pix Pix documentation}
 * @see {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/configure-integration/other-payment-methods/brasil Other payment methods documentation}.
 */
type TPaymentBrickPaymentType =
  | 'atm'
  | 'ticket'
  | 'bank_transfer'
  | 'creditCard'
  | 'debitCard'
  | 'wallet_purchase'
  | 'onboarding_credits';

interface IPayerAPI {
  /**
   * Email of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Consult Payer data} documentation.
   */
  email: string;
  /**
   * Personal identification of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Consult Payer data} documentation.
   */
  identification: IPayerIdentification;
  /**
   * First name of the associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Consult Payer data} documentation.
   */
  first_name: string;
  /**
   * Last name of the associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Consult Payer data} documentation.
   */
  last_name: string;
  /**
   * Address of the associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Consult Payer data} documentation.
   */
  address: IPayerAddressAPI;
}

interface IPayerAddressAPI {
  /**
   * Zip code of the associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Consult Payer address} documentation.
   */
  zip_code: string;
  /**
   * Federal unit of the associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Consult Payer address} documentation.
   */
  federal_unit: string;
  /**
   * City of the associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Consult Payer address} documentation.
   */
  city: string;
  /**
   * Neighborhood code of the associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Consult Payer address} documentation.
   */
  neighborhood: string;
  /**
   * Street name code of the associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Consult Payer address} documentation.
   */
  street_name: string;
  /**
   * Street number code of the associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Consult Payer address} documentation.
   */
  street_number: number;
}

interface IAdditionalData {
  /**
   * Bin of the card entered by the user.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/additional-data additional data customization} documentation.
   */
  bin: string;
}
