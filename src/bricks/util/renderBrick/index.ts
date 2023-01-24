import { MercadoPagoInstance } from '../../../mercadoPago/useMercadoPago';
import { InstanceMercadoPagoType } from '../types/common';

type TgenericRenderBrick = {
  settings: any;
  name: string;
  divId: string;
  controller: unknown;
};
export const initBrick = async ({ settings, name, divId, controller }: TgenericRenderBrick) => {
  const instanceMercadoPago = (await MercadoPagoInstance.init()) as InstanceMercadoPagoType;
  const bricksBuilder = instanceMercadoPago.bricks();

  controller = await bricksBuilder.create(name, divId, settings);
};
