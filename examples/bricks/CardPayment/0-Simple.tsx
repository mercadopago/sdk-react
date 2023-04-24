import React from 'react';
import Card from '../../../src/bricks/cardPayment';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });
setTimeout(
  () => initMercadoPago('APP_USR-72435728-2951-4991-984f-d137a027ed9c', { locale: 'pt-BR' }),
  1000,
);

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
