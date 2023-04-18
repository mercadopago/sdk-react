import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";

const getIdentificationTypes = async () => {
  const instanceMercadoPago = await MercadoPagoInstance.init();
  return instanceMercadoPago?.getIdentificationTypes();
};

export default getIdentificationTypes;
