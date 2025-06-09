import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';

/**
 * Retrieves card ID from a pseudotoken
 * 
 * @param fastPaymentToken - Base64 encoded token data containing authentication
 * @param pseudotoken - The pseudotoken to get card ID for
 * @returns Promise with card ID response
 */
const getCardId = async (fastPaymentToken: string, pseudotoken: string) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.getCardId(fastPaymentToken, pseudotoken);
};

export default getCardId;