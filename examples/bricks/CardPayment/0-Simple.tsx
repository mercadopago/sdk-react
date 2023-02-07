import React from 'react';
import Card from '../../../src/bricks/cardPayment';

import useMercadoPago from '../../../src/mercadoPago/useMercadoPago';

useMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

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
