export interface IPayerIdentification {
  type: string;
  number: string;
}

export interface IBrickError {
  type: 'non_critical' | 'critical';
  cause: string;
  message: string;
}

export interface IBrickCallbacks {
  /**
   *  Callback called when Brick is ready. Here you can hide loadings from your site, for example.
   */
  onReady?: () => void;
  /**
   * Callback called for all Brick error cases.
   *
   * @param error - A {@link IBrickError} objects
   *
   * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/additional-content/possible-errors Possible errors} documentation.
   */
  onError?: (error: IBrickError) => void;
  /**
   *  Callback called when the event click is trigger.
   */
  onSubmit?: () => void;
}

export interface IBrickSettings extends IBrickCallbacks {}

export type BricksBuilderType = {
  create: (param: string, param2: string, settings: {}) => void;
};

export type InstanceMercadoPagoType = {
  bricks: () => BricksBuilderType;
};
