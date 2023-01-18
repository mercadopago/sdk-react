export type PaymentType = {
  onSubmit?: () => void;
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
