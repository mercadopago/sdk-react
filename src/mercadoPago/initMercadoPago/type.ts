import type { FieldsCardTokenParams } from "../../coreMethods/createCardToken/types";
import type { CardTokenParams, CardTokenUpdateParams } from "../../coreMethods/cardToken/types";
import type { IdentificationType } from "../../coreMethods/getIdentificationTypes/types";
import type { Installments, InstallmentsParams } from "../../coreMethods/getInstallments/types";
import type { Issuers, IssuersParams } from "../../coreMethods/getIssuers/types";
import type { PaymentMethods, PaymentMethodsParams } from "../../coreMethods/getPaymentMethods/types";
import type { CardToken } from "../../coreMethods/util/types";
import type { FieldName, Field, FieldsOptions } from "../../secureFields/util/types";

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
  getPaymentMethods: (paymentMethodsParams: PaymentMethodsParams) => Promise<PaymentMethods>;
  getIssuers: (issuersParams: IssuersParams) => Promise<Issuers[]>;
  getInstallments: (installmentsParams: InstallmentsParams) => Promise<Installments[]>;
  createCardToken: (cardTokenParams: CardTokenParams) => Promise<CardToken>;
  updateCardToken: (paymentMethodsParams: CardTokenUpdateParams) => Promise<CardToken>;
  fields: {
    createCardToken: (fieldsCardTokenParams: FieldsCardTokenParams) => Promise<CardToken>;
    updateCardToken: (token: string) => Promise<CardToken>;
    create: <T extends FieldName>(field: T, options?: FieldsOptions<T>) => Field;
  };
};
