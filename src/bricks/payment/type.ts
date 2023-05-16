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
   * Non-optional. Object containing initialization options.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/default-rendering Payment Brick # Default rendering} documentation.
   */
  initialization: {
    /**
     * Non-optional. Total amount to be paid by all means of payment with exception of Mercado Pago Wallet, which has its processing value determined in backend through the "preferenceId".
     *
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/default-rendering Payment Brick # Default rendering} documentation.
     */
    amount: number;
    /**
     * Optional. Payer data that can start already filled in.
     *
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payment Brick # Additional settings # Initialize data on the bricks} documentation.
     */
    payer?: IPaymentBrickPayer;
    /**
     * Optional. Automatically unique ID generated in backend that identifies the preference. For example: 036151801-2484cd71-7140-4c51-985a-d4cfcf133baf
     *
     * @tutorial {@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences/post Create preference} documentation.
     */
    preferenceId?: string;
  };
  /**
   * Non-optional. An object containing customization brick options.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/default-rendering Payment Brick # Default rendering} documentation.
   */
  customization: IPaymentBrickCustomization;
  /**
   * Optional. Language selection for the Brick, options are:
   * {pt, es, es-AR, es-MX, es-UY, es-PE, es-CL, es-CO, en}
   *
   * @tutorial {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/select-language General Customizations # Select Language} documentation.
   */
  locale?: string;
};

interface IPaymentFormData {
  /**
   * Non-optional. Payment type returned at onSubmit.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/other-payment-methods/brasil Returned data} documentation.
   */
  paymentType: TPaymentBrickPaymentType;
  /**
   * Non-optional. Selected payment method returned at onSubmit.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/other-payment-methods/brasil Returned data} documentation.
   */
  selectedPaymentMethod: TPaymentBrickPaymentType;
  /**
   * Non-optional. Information returned at onSubmit.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/other-payment-methods/brasil Returned data} documentation.
   */
  formData: ICardPaymentFormData<ICardPaymentBrickPayer> &
    ICardPaymentFormData<ISavedCardPayer> &
    TicketFormData;
  /**
   * Optional. Bin of the card entered by the user.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/additional-data Payment Brick # Additional Settings # Data customization} documentation.
   */
  additionalData?: IAdditionalData;
}

interface ISavedCardPayer {
  /**
   * Non-optional. Saved cards type.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/customers-cards Payment Brick # Additional Settings # Include Saved Cards} documentation.
   */
  type: string;
  /**
   * Non-optional. Saved cards id.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/customers-cards Payment Brick # Additional Settings # Include Saved Cards} documentation.
   */
  id: string;
}

interface TicketFormData {
  /**
   * Non-optional. Ticket transaction amount.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  transaction_amount: number;
  /**
   * Non-optional. Ticket payment method id.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  payment_method_id: string;
  /**
   * Non-optional. Ticket payer data.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  payer: IPayerAPI;
}

interface IPaymentBrickCustomization {
  /**
   * Optional. Control visual aspects of brick.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  visual?: TPaymentBrickVisual;
  /**
   * Non-optional. Object that allow payment methods configuration.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  paymentMethods: TPaymentBrickPaymentMethods;
}

/**
 * Non-optional. Control the visual aspects of the brick.
 *
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
 */
type TPaymentBrickVisual = IPaymentBrickBaseVisual & IPaymentBrickVisual;

/**
 * Control the visual aspects of the brick.
 *
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
 */
interface IPaymentBrickBaseVisual
  extends IBrickVisual<IPaymentBrickCustomizableTexts, IPaymentBrickStyle>,
    ICardPaymentBrickVisual {}

interface IPaymentBrickVisual {
  /**
   * Optional. Hide redirection form.
   *
   */
  hideRedirectionPanel?: boolean;
  /**
   * Optional. Maintaining saved cards order established in the property initialization.payer.cardsIds.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  preserveSavedCardsOrder?: boolean;
  /**
   * Optional. Define a single payment method as default, so the form will load with this option already selected.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  defaultPaymentOption?: {
    /**
     * Optional. Form loads with credit card selected
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    creditCardForm?: boolean;
    /**
     * Optional. Form loads with debit card selected
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    debitCardForm?: boolean;
    /**
     * Optional. Form loads with saved card
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    savedCardForm?: string;
    /**
     * Optional. Form loads with ticket selected
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    ticketForm?: boolean;
    /**
     * Optional. Form loads bank transfer selected
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    bankTransferForm?: boolean;
    /**
     * Optional. Form loads with Mercado Pago Wallet selected.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    walletForm?: boolean;
    /**
     * Optional. Form loads with Mercado Pago Credits selected.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    creditForm?: boolean;
  };
}

/**
 * Non-optional. Configuration of which payment methods will be accepted
 *
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/manage-payment-methods Payment # Additional Settings # Manage Payment Methods} documentation.
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
   * Optional. Customizable maximum number of installments to be offered to the user.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  maxInstallments?: number;
  /**
   * Optional. Customizable minimum number of installments to be offered to the user.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  minInstallments?: number;
  /**
   * Optional. Define which payment methods will be accepted or not.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  types?: {
    /**
     * Optional. Define which payment methods will not be accepted.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    excluded?: TPaymentBrickPaymentType[];
    /**
     * Optional. Define which payment methods will be accepted.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    included?: TPaymentBrickPaymentType[];
  };
}

interface ILabelPlaceholder {
  /**
   * Optional. Define custom label text.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  label?: string;
  /**
   * Optional. Define custom placeholder text.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  placeholder?: string;
}

interface IPaymentBrickCustomizableTexts {
  /**
   * Optional. Custom payer label or placeholder first name.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md  Text customization} documentation.
   */
  payerFirstName?: ILabelPlaceholder;
  /**
   * Optional. Custom payer label or placeholder last name.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  payerLastName?: ILabelPlaceholder;
  /**
   * Optional. Custom payer label or placeholder zip code.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  zipCode?: ILabelPlaceholder;
  /**
   * Optional. Custom payer label or placeholder state.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  addressState?: ILabelPlaceholder;
  /**
   * Optional. Custom payer label or placeholder address city.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  addressCity?: ILabelPlaceholder;
  /**
   * Optional. Custom payer label or placeholder address neighborhood.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  addressNeighborhood?: ILabelPlaceholder;
  /**
   * Optional. Custom payer label or placeholder address street.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  addressStreet?: ILabelPlaceholder;
  /**
   * Optional. Custom payer label or placeholder address number.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  addressNumber?: { label?: string };
  /**
   * Optional. Custom payer label or placeholder address complement.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  addressComplement?: { label?: string };
}

interface IPaymentBrickStyle extends IBrickStyle<IPaymentBrickCustomVariables> {}

interface IPaymentBrickCustomVariables extends IBrickCustomVariables {
  /**
   * Optional. Custom variable
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  secondaryColor?: string;
}

interface IPaymentBrickPayer extends ICardPaymentBrickPayer {
  /**
   * Optional. Payer first name that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  firstName?: string;
  /**
   * Optional. Payer last name that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  lastName?: string;
  /**
   * Optional. Payer data that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  address?: IAddress;
  /**
   * Optional. Necessary payer data to display saved cards of a given buyer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/customers-cards Payer data} documentation.
   */
  customerId?: string;
  /**
   * Optional. Necessary payer data to display saved cards of a given buyer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/customers-cards Payer data} documentation.
   */
  cardsIds?: string[];
}

interface IAddress {
  /**
   * Optional. Payer zip code that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  zipCode?: string;
  /**
   * Optional. Payer state address that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  federalUnit?: string;
  /**
   * Optional. Payer city that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  city?: string;
  /**
   * Optional. Payer neighborhood that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  neighborhood?: string;
  /**
   * Optional. Payer street name that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  streetName?: string;
  /**
   * Optional. Payer street number that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  streetNumber?: number;
  /**
   * Optional. Payer complement that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  complement?: string;
}

/**
 *  Non-optional. Payment types.
 *
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/cards Cards type documentation}
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/wallet-credits Mercado Pago Wallet and Installments without card documentation},
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/pix Pix documentation}
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/other-payment-methods/brasil Other payment methods documentation}.
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
   *  Non-optional. Email of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  email: string;
  /**
   *  Non-optional. Personal identification of associated payer. Contains keys type and number.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  identification: IPayerIdentification;
  /**
   *  Non-optional. First name of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  first_name: string;
  /**
   *  Non-optional. Last name of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  last_name: string;
  /**
   *  Non-optional. Address of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  address: IPayerAddressAPI;
}

interface IPayerAddressAPI {
  /**
   *  Non-optional. Zip code of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  zip_code: string;
  /**
   *  Non-optional. Federal unit of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  federal_unit: string;
  /**
   *  Non-optional. City of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  city: string;
  /**
   *  Non-optional. Neighborhood code of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  neighborhood: string;
  /**
   *  Non-optional. Street name code of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  street_name: string;
  /**
   *  Non-optional. Street number code of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  street_number: number;
}

interface IAdditionalData {
  /**
   *  Non-optional. Bin of card entered by user.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/additional-data Data customization} documentation.
   */
  bin: string;
}
