import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { TPaymentMethodsParams } from "./types";

/**
 * @description Returns a payment methods list.
 * 
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/core-methods.md#mp-instancegetpaymentmethodspaymentmethodsparams method documentation}.
 * @see {@link https://www.mercadopago.com/developers/en/reference/payment_methods/_payment_methods/get response documentation}.
 */
const getPaymentMethods = async (paymentMethodsParams: TPaymentMethodsParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.init();
  return instanceMercadoPago?.getPaymentMethods(paymentMethodsParams);
};

export default getPaymentMethods;
