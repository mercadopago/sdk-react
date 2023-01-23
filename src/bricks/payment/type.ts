export type BricksBuilderType = {
  create: (param: string, param2: string, settings: {}) => void;
};

export type InstanceMercadoPagoType = {
  bricks: () => BricksBuilderType;
};

export type PaymentType = {
  onSubmit: () => void;
  onReady?: () => void;
  onError?: (param: Error) => void;
  config: {
    initialization: {
      amount: number;
    };
    customization: {
      paymentMethods: {
        bankTransfer: string[];
      };
    };
  };
};
