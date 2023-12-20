import React from 'react';
import Brand from '../../../src/bricks/brand';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago('TEST-bfe30303-c7de-4da3-b765-c4be61b4f88b', {
  locale: 'es-AR',
});

const ExampleSimpleBrandBrick = () => {
  return <Brand />;
};

export default ExampleSimpleBrandBrick;
