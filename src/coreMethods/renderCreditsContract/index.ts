import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';
import { CreditsContractOptions, CreditsContractController } from './types';

/**
 * Renders a credits contract component for Mercado Crédito payment method
 * 
 * @param containerId - ID of the DOM element where the contract will be rendered
 * @param options - Configuration options including tokens, pricing ID and customization
 * @returns Promise with credits contract controller for managing installments
 */
const renderCreditsContract = async (
  containerId: string,
  options: CreditsContractOptions
): Promise<CreditsContractController | undefined> => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.renderCreditsContract(containerId, options);
};

export default renderCreditsContract;
export * from './types';
