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
    initialization: {
      amount: number;
      payer?: IPaymentBrickPayer;
      preferenceId?: string;
    };
    customization: {
      paymentMethods: {
        atm?: string | string[];
        ticket?: string | string[];
        bankTransfer?: string | string[];
        creditCard?: string | string[];
        debitCard?: string | string[];
        mercadoPago?: string | string[];
      };
    };
  };
};
