import React from 'react';
import Payment from '../../../src/bricks/payment';

import useMercadoPago from '../../../src/mercadoPago/useMercadoPago';

useMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

const App = () => {
  const initialization = {
    amount: 100,
  };

  const customization = {
    paymentMethods: {
      atm: 'all',
      ticket: 'all',
      bankTransfer: ['pix'],
      creditCard: 'all',
      debitCard: 'all',
      mercadoPago: 'all',
    },
  };

  return (
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={async (param) => {
        console.log(param);
      }}
    />
  );
};

export default App;
