export type TCardTokenParams = {
  cardNumber?: string;
  cardholderName?: string
  identificationType?: string
  identificationNumber?: string
  securityCode?: string
  cardExpirationMonth?: string
  cardExpirationYear?: string
  cardId?: string
}

export type Identification = {
  number: string;
  type: string;
}

export type Cardholder = {
  identification: Identification;
  name: string;
}

export type TCardToken = {
  id: string;
  public_key: string;
  card_id?: unknown;
  luhn_validation: boolean;
  status: string;
  date_used?: unknown;
  card_number_length: number;
  date_created: Date;
  first_six_digits: string;
  last_four_digits: string;
  security_code_length: number;
  expiration_month: number;
  expiration_year: number;
  date_last_updated: Date;
  date_due: Date;
  live_mode: boolean;
  cardholder: Cardholder;
}
