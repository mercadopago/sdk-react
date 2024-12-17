import React from 'react';
import Brand from '../../../src/bricks/brand';
import { PUBLIC_KEY } from '../../constants';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago(PUBLIC_KEY, {
  locale: 'es-AR',
});

const ExampleSimpleBrandBrick = () => {
  return <Brand />;
};

export default ExampleSimpleBrandBrick;
