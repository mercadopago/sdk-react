import type { TFieldsCardTokenParams } from "../../coreMethods/createCardToken/types";
import type { TCardTokenParams } from "../../coreMethods/cardToken/types";
import type { IdentificationType } from "../../coreMethods/getIdentificationTypes/types";
import type { TInstallments, TInstallmentsParams } from "../../coreMethods/getInstallments/types";
import type { TIssuers, TIssuersParams } from "../../coreMethods/getIssuers/types";
import type { TPaymentMethods, TPaymentMethodsParams } from "../../coreMethods/getPaymentMethods/types";
import type { TCardToken } from "../../coreMethods/util/types";

export type TOptions = {
  /**
   * Set the locale
   * */
  locale?: 'es-AR' | 'es-CL' | 'es-CO' | 'es-MX' | 'es-VE' | 'es-UY' | 'es-PE' | 'pt-BR' | 'en-US';
  /**
   * Set the advanced fraud prevention status
   */
  advancedFraudPrevention?: boolean;
  /**
   * Enable/disable tracking of generic usage metrics
   */
  trackingDisabled?: boolean;
};

// #############
// CHECKOUT BRICKS
// #############
export type BricksBuilderType = {
  create: (param: string, param2: string, settings: {}) => void;
};

export type TInstanceMercadoPago = {
  bricks: () => BricksBuilderType;
  getIdentificationTypes: () => Promise<IdentificationType[]>;
  getPaymentMethods: (paymentMethodsParams: TPaymentMethodsParams) => Promise<TPaymentMethods>;
  getIssuers: (issuersParams: TIssuersParams) => Promise<TIssuers[]>;
  getInstallments: (installmentsParams: TInstallmentsParams) => Promise<TInstallments[]>;
  createCardToken: (cardTokenParams: TCardTokenParams) => Promise<TCardToken>;
  fields: {
    createCardToken: (fieldsCardTokenParams: TFieldsCardTokenParams) => Promise<TCardToken>;
  };
};
