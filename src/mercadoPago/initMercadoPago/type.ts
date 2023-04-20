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
  siteId?: string;
};

// #############
// CHECKOUT BRICKS
// #############
export type BricksBuilderType = {
  create: (param: string, param2: string, settings: {}) => void;
};

export type TInstanceMercadoPago = {
  bricks: () => BricksBuilderType;
};
