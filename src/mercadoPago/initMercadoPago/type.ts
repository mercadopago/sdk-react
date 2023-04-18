import type { TPaymentMethods, TPaymentMethodsParams } from "../../coreMethods/getPaymentMethods/types";

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

// #############
// CORE METHODS
// #############
export type IdentificationType = {
  id: string,
  name: string,
  type: string,
  min_length: number,
  max_length: number
}

export type TInstanceMercadoPago = {
  bricks: () => BricksBuilderType;
  getIdentificationTypes: () => Promise<IdentificationType[]>;
  getPaymentMethods: (paymentMethodsParams: TPaymentMethodsParams) => Promise<TPaymentMethods>
};
