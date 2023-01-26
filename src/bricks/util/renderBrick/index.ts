import { MercadoPagoInstance } from '../../../mercadoPago/useMercadoPago';
import { InstanceMercadoPagoType } from '../types/common';

type TgenericRenderBrick = {
  settings: any;
  name: string;
  divId: string;
  controller: string;
};
export const initBrick = async ({ settings, name, divId, controller }: TgenericRenderBrick) => {
  const instanceMercadoPago = (await MercadoPagoInstance.init()) as InstanceMercadoPagoType;
  const bricksBuilder = instanceMercadoPago.bricks();

  (window as { [key: string]: any })[controller] = await bricksBuilder.create(
    name,
    divId,
    settings,
  );
};
