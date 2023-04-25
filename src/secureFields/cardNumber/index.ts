import React, { useEffect } from 'react';
import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';

const CardNumber = async () => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  instanceMercadoPago?.fields.create();
};

export default CardNumber;
