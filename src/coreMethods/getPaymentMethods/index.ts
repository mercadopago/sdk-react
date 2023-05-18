import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { PaymentMethodsParams } from "./types";

/**
 * Returns a payment methods list.
 * 
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/core-methods.md#mp-instancegetpaymentmethodspaymentmethodsparams method documentation}.
 * @see {@link https://www.mercadopago.com/developers/en/reference/payment_methods/_payment_methods/get response documentation}.
 */
const getPaymentMethods = async (paymentMethodsParams: PaymentMethodsParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.getPaymentMethods(paymentMethodsParams);
};

export default getPaymentMethods;
