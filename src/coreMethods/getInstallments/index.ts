import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { TInstallmentsParams } from "./types";

/**
 * Returns all installments available.
 * 
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/core-methods.md#mp-instancegetinstallmentsinstallmentsparams method documentation}.
 */
const getInstallments = async (installmentsParams: TInstallmentsParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.init();
  return instanceMercadoPago?.getInstallments(installmentsParams);
};

export default getInstallments;
