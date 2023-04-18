import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { TInstallmentsParams } from "./types";

const getInstallments = async (installmentsParams: TInstallmentsParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.init();
  return instanceMercadoPago?.getInstallments(installmentsParams);
};

export default getInstallments;
