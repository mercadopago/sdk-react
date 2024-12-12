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
  onSubmit: (param: IPaymentFormData, param2?: IAdditionalCardFormData | null) => Promise<unknown>;
  onReady?: () => void;
  onError?: (param: IBrickError) => void;
  onBinChange?: (param: string) => void;
  onClickEditShippingData?: () => void;
  onClickEditBillingData?: () => void;
  onRenderNextStep?: (currentStep: string) => void;
  onRenderPreviousStep?: (currentStep: string) => void;

  /**
   * Required. Object containing initialization options.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/default-rendering Payment Brick} documentation.
   */
  initialization: {
    /**
     * Required. Total amount to be paid by all means of payment with exception of Mercado Pago Wallet, which has its processing value determined in backend through the "preferenceId".
     *
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/default-rendering Payment Brick} documentation.
     */
    amount: number;
    /**
     * Optional. Payer data that can start already filled in.
     *
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payment Brick} documentation.
     */
    payer?: IPaymentBrickPayer;
    /**
     * Optional. Automatically unique ID generated in backend that identifies the preference. For example: 036151801-2484cd71-7140-4c51-985a-d4cfcf133baf
     *
     * @see {@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences/post Create preference} documentation.
     */
    preferenceId?: string;
    /**
     * Optional. Required only for review step. Defines the ordered items.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization} documentation.
     */
    items?: IReviewConfirmItems;
    /**
     * Optional. Defines shipping data for review step.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization} documentation.
     */
    shipping?: IReviewConfirmShipping;
    /**
     * Optional. Defines billing data for review step.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization} documentation.
     */
    billing?: IReviewConfirmBilling;
    /**
     * Optional. Defines applied discounts data for review step.
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization} documentation.
     */
    discounts?: IReviewConfirmDiscounts;
    /**
     * Optional. This parameter enables the use of Wallet Brick in Marketplace mode
     *
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/wallet-credits Mercado Pago Wallet and Installments without card} documentation.
     */
    marketplace?: boolean;
  };
  /**
   * Required. An object containing customization brick options.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/default-rendering Payment Brick} documentation.
   */
  customization: IPaymentBrickCustomization;
  /**
   * Optional. Language selection for the Brick, options are:
   * {pt, es, es-AR, es-MX, es-UY, es-PE, es-CL, es-CO, en}
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/select-language General Customizations # Select Language} documentation.
   */
  locale?: string;
  /**
   * Optional. Container ID where the Brick will be rendered. Default: 'paymentBrick_container'
   */
  id?: string;
};
export interface IReviewConfirmItems {
  /**
   * Required. Sum of the values of all ordered items.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization} documentation.
   */
  totalItemsAmount: number;
  /**
   * Required. Array with the ordered items.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization} documentation.
   */
  itemsList: IListItems[];
}

export interface IListItems {
  /**
   * Required. Quantity of a given item.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Items} documentation.
   */
  units: number;
  /**
   * Required. Value per a given item.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Items} documentation.
   */
  value: number;
  /**
   * Required. Item name.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Items} documentation.
   */
  name: string;
  /**
   * Optional. Item description.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Items} documentation.
   */
  description?: string;
  /**
   * Optional. Item image.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Items} documentation.
   */
  imageURL?: string;
}

export interface IReviewConfirmShipping {
  /**
   * Optional. The shipping cost.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Shipping} documentation.
   */
  costs?: number;
  /**
   * Required. The type of shipping.
   *
   * @example shippingMode: 'Express'
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Shipping} documentation.
   */
  shippingMode: string;
  /**
   * Optional. Shipping description.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Shipping} documentation.
   */
  description?: string;
  /**
   * Required. Shipping address.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Shipping} documentation.
   */
  receiverAddress: IDefaultAddress;
}

export interface IDefaultAddress {
  /**
   * Required. Payer street name that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  streetName: string;
  /**
   * Required. Payer street number that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  streetNumber: string;
  /**
   * Optional. Payer neighborhood that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  neighborhood?: string;

  /**
   * Optional. Payer city that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  city?: string;
  /**
   * Optional. Payer state address that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  federalUnit?: string;
  /**
   * Required. Payer zip code that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  zipCode: string;
  /**
   * Optional. Note message regarding shipping address.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  additionalInformation?: string;
}

export interface IReviewConfirmBilling {
  /**
   * Optional. The first name under which the payment should be issued.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Billing} documentation.
   */
  firstName?: string;
  /**
   * Optional. The last name under which the payment should be issued.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Billing} documentation.
   */
  lastName?: string;
  /**
   * Optional. The tax regime.
   *
   * @example taxRegime?: 'Simplified Trust Regime'
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Billing} documentation.
   */
  taxRegime?: string;
  /**
   * Required. The tax identification number.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Billing} documentation.
   */
  taxIdentificationNumber: string;
  /**
   * Optional. Defines payer identification.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Billing} documentation.
   */
  identification?: IPayerIdentification;
  /**
   * Optional. The payer's address under which the payment should be issued.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Billing} documentation.
   */
  billingAddress?: IDefaultAddress;
}

export interface IReviewConfirmDiscounts {
  /**
   * Required. Sum of the values of all applied discounts	.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Discounts} documentation.
   */
  totalDiscountsAmount: number;
  /**
   * Required. The payer's address under which the payment should be issued.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Discounts} documentation.
   */
  discountsList: IDiscountsList[];
}
export interface IDiscountsList {
  /**
   * Required. Discount name.
   *
   * @example name: 'BLACKFRIDAY10'
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Discounts} documentation.
   */
  name: string;
  /**
   * Required. Discount value.
   *
   * @example value: 10
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#initialization Initialization Discounts} documentation.
   */
  value: number;
}

export interface IPaymentFormData {
  /**
   * Required. Payment type returned at onSubmit.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/other-payment-methods Returned data} documentation.
   */
  paymentType: TPaymentBrickPaymentType;
  /**
   * Required. Selected payment method returned at onSubmit.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/other-payment-methods Returned data} documentation.
   */
  selectedPaymentMethod: TPaymentBrickPaymentType;
  /**
   * Required. Information returned at onSubmit.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/other-payment-methods Returned data} documentation.
   */
  formData: ICardPaymentFormData<ICardPaymentBrickPayer> &
    ICardPaymentFormData<ISavedCardPayer> &
    TicketFormData &
    IFormDataAdditionalInfo;
  /**
   * Optional. Bin of the card entered by the user.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/additional-data Payment Brick # Additional Settings # Data customization} documentation.
   */
  additionalData?: IAdditionalData | IAdditionalCardFormData;
}

export interface ISavedCardPayer {
  /**
   * Required. Saved cards type.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/customers-cards Payment Brick} documentation.
   */
  type: string;
  /**
   * Required. Saved cards id.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/customers-cards Payment Brick} documentation.
   */
  id: string;
}

export interface TransactionDetails {
  /**
   * Required. Financial institution.
   */
  financial_institution: string;
}

export interface Metadata {
  /**
   * Optional. Payment point is useful to show the buyer where to pay.
   */
  payment_point?: string;
  /**
   * Optional. Payment mode is useful to show the buyer where and how to pay.
   */
  payment_mode?: string;
}

export interface TicketFormData {
  /**
   * Required. Ticket transaction amount.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  transaction_amount: number;
  /**
   * Required. Ticket payment method id.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  payment_method_id: string;
  /**
   * Required. Ticket payer data.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  payer: IPayerAPI;
  /**
   * Optional. Transaction details is returned for PSE payment method only (Colombia)
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md} documentation.
   */
  transaction_details?: TransactionDetails;
  /**
   * Optional. Payment useful metadata.
   */
  metadata?: Metadata;
}

export type IFormDataAdditionalInfo = {
  /**
   * Optional. Additional information returned at onSubmit.
   *
   */
  additional_info?: IAdditionalInfo;
};

export interface IAdditionalInfo {
  /**
   * Optional. Items information returned at onSubmit.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#callbacks Callbacks} documentation.
   */
  items?: IAdditionalInfoItems[];
  /**
   * Optional. Shipments information returned at onSubmit.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#callbacks Callbacks} documentation.
   */
  shipments?: IAdditionalInfoShipments;
}

export interface IAdditionalInfoItems {
  /**
   * Required. Item price returned at onSubmit.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#callbacks Callbacks} documentation.
   */
  unit_price: number;
  /**
   * Required. Item quantity returned at onSubmit.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#callbacks Callbacks} documentation.
   */
  quantity: number;
  /**
   * Required. Item title returned at onSubmit.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#callbacks Callbacks} documentation.
   */
  title: string;
  /**
   * Optional. Item description returned at onSubmit.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#callbacks Callbacks} documentation.
   */
  description?: string;
  /**
   * Optional. Item url image returned at onSubmit.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#callbacks Callbacks} documentation.
   */
  picture_url?: string;
}

export interface IAdditionalInfoShipments {
  /**
   * Required. Receiver address returned at onSubmit.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#callbacks Callbacks} documentation.
   */
  receiver_address: {
    /**
     * Required. Zip code returned at onSubmit.
     *
     */
    zip_code?: string;
    /**
     * Optional. State name returned at onSubmit.
     *
     */
    state_name?: string;
    /**
     * Optional. City name returned at onSubmit.
     *
     */
    city_name?: string;
    /**
     * Required. Street name returned at onSubmit.
     *
     */
    street_name?: string;
    /**
     * Required. Street number returned at onSubmit.
     *
     */
    street_number?: number;
    /**
     * Optional. Apartment returned at onSubmit.
     *
     */
    apartment?: string;
  };
}

export interface IPaymentBrickCustomization {
  /**
   * Optional. Control visual aspects of brick.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  visual?: TPaymentBrickVisual;
  /**
   * Required. Object that allow payment methods configuration.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
   */
  paymentMethods: TPaymentBrickPaymentMethods;
  /**
   * Optional. Enable review and confirm feature.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#full-example-with-review-and-confirmation-steps} documentation.
   */
  enableReviewStep?: boolean;
  /**
   * Optional. Object that organizes review and confirm visual elements.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/paymentReview.md#full-example-with-review-and-confirmation-steps} documentation.
   */
  reviewCardsOrder?: string[];
}

type TPaymentBrickVisual = IPaymentBrickBaseVisual & IPaymentBrickVisual;

/**
 * Control the visual aspects of the brick.
 *
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Data customization} documentation.
 */
export interface IPaymentBrickBaseVisual
  extends IBrickVisual<IPaymentBrickCustomizableTexts, IPaymentBrickStyle>,
    ICardPaymentBrickVisual {}

export interface IPaymentBrickVisual {
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
 * Required. Configuration of which payment methods will be accepted
 *
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/manage-payment-methods Payment} documentation.
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

export interface IPaymentBrickPaymentMethods {
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

export interface ILabelPlaceholder {
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

export interface IPaymentBrickCustomizableTexts {
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

export type IPaymentBrickStyle = IBrickStyle<IPaymentBrickCustomVariables>;

export interface IPaymentBrickCustomVariables extends IBrickCustomVariables {
  /**
   * Optional. Custom variable
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  secondaryColor?: string;
  /**
   * Optional. Custom variable
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Text customization} documentation.
   */
  secondaryColorListItem?: string;
}

type EntityType = 'individual' | 'association';

export interface IPaymentBrickPayer extends ICardPaymentBrickPayer {
  /**
   * Optional. Payer first name that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  firstName?: string;
  /**
   * Optional. Payer last name that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  lastName?: string;
  /**
   * Optional. Payer entity type, useful only for PSE payment method (Colombia).
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  entityType?: EntityType;
  /**
   * Optional. Payer data that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  address?: IAddress;
  /**
   * Optional. Necessary payer data to display saved cards of a given buyer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/customers-cards Payer data} documentation.
   */
  customerId?: string;
  /**
   * Optional. Necessary payer data to display saved cards of a given buyer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/customers-cards Payer data} documentation.
   */
  cardsIds?: string[];
}

export interface IAddress extends Partial<IDefaultAddress> {
  /**
   * Optional. Payer complement that can start already filled in.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  complement?: string;
}

/**
 *  Required. Payment types.
 *
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/cards Cards type documentation}
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/wallet-credits Mercado Pago Wallet and Installments without card documentation},
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/pix Pix documentation}
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/payment-submission/other-payment-methods Other payment methods documentation}.
 */
type TPaymentBrickPaymentType =
  | 'atm'
  | 'ticket'
  | 'bank_transfer'
  | 'creditCard'
  | 'debitCard'
  | 'wallet_purchase'
  | 'onboarding_credits';

export interface IPayerAPI {
  /**
   *  Required. Email of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  email: string;
  /**
   *  Required. Personal identification of associated payer. Contains keys type and number.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  identification: IPayerIdentification;
  /**
   *  Required. First name of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  first_name: string;
  /**
   *  Required. Last name of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  last_name: string;
  /**
   *  Required. Address of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  address: IPayerAddressAPI;
  /**
   *  Optional. Entity type is returned for PSE payment method only (Colombia).
   *
   * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Payer data} documentation.
   */
  entity_type?: EntityType;
}

export interface IPayerAddressAPI {
  /**
   *  Required. Zip code of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  zip_code: string;
  /**
   *  Required. Federal unit of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  federal_unit: string;
  /**
   *  Required. City of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  city: string;
  /**
   *  Required. Neighborhood code of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  neighborhood: string;
  /**
   *  Required. Street name code of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  street_name: string;
  /**
   *  Required. Street number code of associated payer.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/initialize-data-on-the-bricks Payer data} documentation.
   */
  street_number: string;
}

export interface IAdditionalData {
  /**
   *  Required. Bin of card entered by user.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/advanced-features/additional-data Data customization} documentation.
   */
  bin: string;
  /**
   *  Required. Last four digits of card entered by user.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md#callbacks Callbacks} documentation.
   */
  lastFourDigits: string;
}

export interface IAdditionalCardFormData extends IAdditionalData {
  /**
   *  Optional. Cardholder name of card entered by user.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md#callbacks Callbacks} documentation.
   */
  cardholderName?: string;
}
