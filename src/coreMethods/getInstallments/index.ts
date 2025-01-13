import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';
import type { InstallmentsParams } from './types';

/**
 * Returns all installments available.
 *
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/core-methods.md#mp-instancegetinstallmentsinstallmentsparams method documentation}.
 */
const getInstallments = async (installmentsParams: InstallmentsParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.getInstallments(installmentsParams);
};

export default getInstallments;
