import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { TIssuersParams } from "./types";

const getIssuers = async (issuersParams: TIssuersParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.init();
  return instanceMercadoPago?.getIssuers(issuersParams);
};

export default getIssuers;
