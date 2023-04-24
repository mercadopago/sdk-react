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

export type TCardTokenUpdateParams = {
  securityCode?: string;
  cardExpirationMonth?: string;
  cardExpirationYear?: string;
  token?: string;
};
