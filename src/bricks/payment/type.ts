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
   * Object containing initialization options.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/code-example/all-payment-methods Data customization} documentation.
   */
  initialization: {
    /**
     * Total amount to be paid by all means of payment with exception of Mercado Pago Wallet, which has its processing value determined in backend through the "preferenceId".
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
   * An object containing customization brick options.
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
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/additional-data Data customization} documentation.
   */
  additionalData?: IAdditionalData;
}

interface ISavedCardPayer {
  /**
   * Saved cards type.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/configure-integration/cards#bookmark_include_saved_cards Data customization} documentation.
   */
  type: string;
  /**
   * Saved cards id.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/configure-integration/cards#bookmark_include_saved_cards Data customization} documentation.
   */
  id: string;
}

interface TicketFormData {
  /**
   * Ticket transaction amount.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  transaction_amount: number;
  /**
   * Ticket payment method id.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  payment_method_id: string;
  /**
   * Ticket payer data.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  payer: IPayerAPI;
}

interface IPaymentBrickCustomization {
  /**
   * Control visual aspects of brick.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  visual?: TPaymentBrickVisual;
  /**
   * Object that allow payment methods configuration.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  paymentMethods: TPaymentBrickPaymentMethods;
}

/**
 * Control the visual aspects of the brick.
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
   * Hide redirection form.
   *
   */
  hideRedirectionPanel?: boolean;
  /**
   * Maintaining saved cards order established in the property initialization.payer.cardsIds.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  preserveSavedCardsOrder?: boolean;
  /**
   * Define a single payment method as default, so the form will load with this option already selected.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  defaultPaymentOption?: {
    /**
     * Form loads with credit card selected
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    creditCardForm?: boolean;
    /**
     * Form loads with debit card selected
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    debitCardForm?: boolean;
    /**
     * Form loads with saved card
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    savedCardForm?: string;
    /**
     * Form loads with ticket selected
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    ticketForm?: boolean;
    /**
     * Form loads bank transfer selected
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    bankTransferForm?: boolean;
    /**
     * Form loads with Mercado Pago Wallet selected.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    walletForm?: boolean;
    /**
     * Form loads with Mercado Pago Credits selected.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    creditForm?: boolean;
  };
}

/**
 * Configuration of which payment methods will be accepted
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
   * Customizable maximum number of installments to be offered to the user.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  maxInstallments?: number;
  /**
   * Customizable minimum number of installments to be offered to the user.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  minInstallments?: number;
  /**
   * Define which payment methods will be accepted or not.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  types?: {
    /**
     * Define which payment methods will not be accepted.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    excluded?: TPaymentBrickPaymentType[];
    /**
     * Define which payment methods will be accepted.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
     */
    included?: TPaymentBrickPaymentType[];
  };
}

interface ILabelPlaceholder {
  /**
   * Define custom label text.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  label?: string;
  /**
   * Define custom placeholder text.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  placeholder?: string;
}

interface IPaymentBrickCustomizableTexts {
  /**
   * Custom payer label or placeholder first name.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md  Text customization} documentation.
   */
  payerFirstName?: ILabelPlaceholder;
  /**
   * Custom payer label or placeholder last name.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  payerLastName?: ILabelPlaceholder;
  /**
   * Custom payer label or placeholder zip code.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  zipCode?: ILabelPlaceholder;
  /**
   * Custom payer label or placeholder state.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  addressState?: ILabelPlaceholder;
  /**
   * Custom payer label or placeholder address city.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  addressCity?: ILabelPlaceholder;
  /**
   * Custom payer label or placeholder address neighborhood.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  addressNeighborhood?: ILabelPlaceholder;
  /**
   * Custom payer label or placeholder address street.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  addressStreet?: ILabelPlaceholder;
  /**
   * Custom payer label or placeholder address number.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  addressNumber?: { label?: string };
  /**
   * Custom payer label or placeholder address complement.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  addressComplement?: { label?: string };
}

interface IPaymentBrickStyle extends IBrickStyle<IPaymentBrickCustomVariables> {}

interface IPaymentBrickCustomVariables extends IBrickCustomVariables {
  /**
   * Custom variable
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  secondaryColor?: string;
}

interface IPaymentBrickPayer extends ICardPaymentBrickPayer {
  /**
   * Payer first name that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  firstName?: string;
  /**
   * Payer last name that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  lastName?: string;
  /**
   * Payer data that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  address?: IAddress;
  /**
   * Necessary payer data to display saved cards of a given buyer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/customers-cards Payer data} documentation.
   */
  customerId?: string;
  /**
   * Necessary payer data to display saved cards of a given buyer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/customers-cards Payer data} documentation.
   */
  cardsIds?: string[];
}

interface IAddress {
  /**
   * Payer zip code that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  zipCode?: string;
  /**
   * Payer state address that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  federalUnit?: string;
  /**
   * Payer city that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  city?: string;
  /**
   * Payer neighborhood that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  neighborhood?: string;
  /**
   * Payer street name that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  streetName?: string;
  /**
   * Payer street number that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  streetNumber?: number;
  /**
   * Payer complement that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
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
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  email: string;
  /**
   * Personal identification of associated payer. Contains keys type and number.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  identification: IPayerIdentification;
  /**
   * First name of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  first_name: string;
  /**
   * Last name of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  last_name: string;
  /**
   * Address of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  address: IPayerAddressAPI;
}

interface IPayerAddressAPI {
  /**
   * Zip code of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  zip_code: string;
  /**
   * Federal unit of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  federal_unit: string;
  /**
   * City of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  city: string;
  /**
   * Neighborhood code of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  neighborhood: string;
  /**
   * Street name code of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  street_name: string;
  /**
   * Street number code of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/initialize-data-on-the-bricks Payer data} documentation.
   */
  street_number: number;
}

interface IAdditionalData {
  /**
   * Bin of card entered by user.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/additional-data Data customization} documentation.
   */
  bin: string;
}
