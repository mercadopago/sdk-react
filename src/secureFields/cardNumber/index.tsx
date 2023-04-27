import React, { useEffect } from 'react';
import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';

const initSecureField = async () => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  const cardNumberInstance = instanceMercadoPago?.fields.create('cardNumber')
  cardNumberInstance?.mount('cardNumberSecureField_container');
};

const CardNumber = () => {
  initSecureField();

  return <div id="cardNumberSecureField_container"></div>;
};

export default CardNumber;
