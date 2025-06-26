import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';

/**
 * Retrieves account payment methods for authenticated users
 * 
 * @param fastPaymentToken - Base64 encoded token data containing authentication and parameters
 * @returns Promise with account payment methods response
 */
const getAccountPaymentMethods = async (fastPaymentToken: string) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.getAccountPaymentMethods(fastPaymentToken);
};

export default getAccountPaymentMethods;