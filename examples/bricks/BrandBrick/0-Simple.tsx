import React from 'react';
import { initMercadoPago, Brand } from '../../../src/index';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY, {
  locale: 'es-AR',
});

const ExampleSimpleBrandBrick = () => {
  return <Brand />;
};

export default ExampleSimpleBrandBrick;
