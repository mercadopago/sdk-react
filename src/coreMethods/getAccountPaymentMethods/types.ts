type TBaseResponseData = {
  id: string;
  name: string;
  thumbnail: string;
  token: string;
  type: string;
};

type TCardResponseData = TBaseResponseData & {
  type: 'credit_card' | 'debit_card';
  issuer: {
    default: boolean;
    id: string;
    name: string;
    bank: {
      country: string;
      name: string;
    };
  };
  security_code_settings: {
    length: number;
    mode: string;
  };
  card: {
    card_number: {
      bin: string;
      last_four_digits: string;
      length: number;
    };
  };
  installments: {
    installment_amount: string;
    installment_rate: number;
    installment_rate_collector: string[];
    installments: number;
    max_allowed_amount: number;
    min_allowed_amount: number;
    total_amount: string;
    labels: string[];
  };
};

type TAccountMoneyResponseData = TBaseResponseData & {
  type: 'account_money';
};

export type AccountPaymentMethodsResponseData = TCardResponseData | TAccountMoneyResponseData;

export type AccountPaymentMethodsResponse = {
  data: AccountPaymentMethodsResponseData[];
};