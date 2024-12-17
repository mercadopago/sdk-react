import React from 'react';
import Card from '../../../src/bricks/cardPayment';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });
const App = () => {
  return (
    <Card
      initialization={{ amount: 100 }}
      onSubmit={async (param) => {
        console.log(param);
      }}
    />
  );
};

export default App;
