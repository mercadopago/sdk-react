export type CardTokenParams = {
  cardNumber?: string;
  cardholderName?: string
  identificationType?: string
  identificationNumber?: string
  securityCode?: string
  cardExpirationMonth?: string
  cardExpirationYear?: string
  cardId?: string
}

export type CardTokenUpdateParams = {
  securityCode?: string;
  cardExpirationMonth?: string;
  cardExpirationYear?: string;
  token?: string;
};
