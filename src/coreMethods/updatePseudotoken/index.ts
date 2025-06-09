import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';

/**
 * Updates a pseudotoken with card token information
 * 
 * @param fastPaymentToken - Base64 encoded token data containing authentication
 * @param pseudotoken - The pseudotoken to update
 * @param cardToken - The card token to associate with the pseudotoken
 * @returns Promise that resolves when update is complete
 */
const updatePseudotoken = async (fastPaymentToken: string, pseudotoken: string, cardToken: string) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.updatePseudotoken(fastPaymentToken, pseudotoken, cardToken);
};

export default updatePseudotoken;