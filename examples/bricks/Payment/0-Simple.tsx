import React from 'react';
import Payment from '../../../src/bricks/payment';

import useMercadoPago from '../../../src/mercadoPago/useMercadoPago';

useMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

const App = () => {
  const configPayment = {
    initialization: {
      amount: 100,
    },
    customization: {
      paymentMethods: {
        atm: 'all',
        ticket: 'all',
        bankTransfer: ['pix'],
        creditCard: 'all',
        debitCard: 'all',
        mercadoPago: 'all',
      },
    },
  };

  return <Payment config={configPayment} />;
};

export default App;
