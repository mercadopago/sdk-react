import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { IssuersParams } from "./types";

/**
 * Returns a issuers list.
 * 
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/core-methods.md#mp-instancegetissuersissuersparams method documentation}.
 */
const getIssuers = async (issuersParams: IssuersParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.getIssuers(issuersParams);
};

export default getIssuers;
