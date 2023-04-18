import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { TPaymentMethodsParams } from "./types";

const getPaymentMethods = async (paymentMethodsParams: TPaymentMethodsParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.init();
  return instanceMercadoPago?.getPaymentMethods(paymentMethodsParams);
};

export default getPaymentMethods;
