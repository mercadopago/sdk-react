type TBaseResponseData = {
  id: string;
  name: string;
  thumbnail: string;
  token: string;
  type: string;
};

type TBaseIssuer = {
  name: string;
  default: boolean;
  id: string | number;
};

type TCardIssuer = TBaseIssuer & {
  id: string;
  bank: {
    country: string;
    name: string;
  };
};

type TCreditsIssuer = TBaseIssuer & {
  id: number; 
};

type TBaseInstallments = {
  installments: number;
  max_allowed_amount: number;
  min_allowed_amount: number;
  labels: string[];
  installment_amount: string;
  installment_rate: number;
  installment_rate_collector: string[];
  total_amount: string;
};

type TCardInstallments = TBaseInstallments;

type TCreditsInstallments = TBaseInstallments & {
  installment_iof_amount: number;
  consumer_credits: {
    conditions: {
      td: string;
      base_td: string;
      tea: string;
      tna: string;
      additional_iof: string;
      iof: string;
      iof_rate: string;
      ceta: string;
      cetm: string;
      tem: string;
    };
  };
};

type TCardResponseData = TBaseResponseData & {
  type: 'credit_card' | 'debit_card';
  issuer: TCardIssuer;
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
  installments: TCardInstallments;
};

type TAccountMoneyResponseData = TBaseResponseData & {
  type: 'account_money';
};

type TConsumerCreditsResponseData = TBaseResponseData & {
  type: 'digital_currency';
  next_due_date: string;
  credits_pricing_id: string;
  issuer: TCreditsIssuer;
  installments: TCreditsInstallments[];
};

export type AccountPaymentMethodsResponseData = TCardResponseData | TAccountMoneyResponseData | TConsumerCreditsResponseData;

export type AccountPaymentMethodsResponse = {
  data: AccountPaymentMethodsResponseData[];
};