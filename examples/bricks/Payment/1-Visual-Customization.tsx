import React from 'react';
import Payment from '../../../src/bricks/payment';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

const App = () => {
  const initialization = {
    amount: 100,
    preferenceId: '207446753-ea3adb2e-a4f2-41dd-a656-11cb01b8772c',
    payer: {
      email: 'test@test.com',
    },
  };

  const customization = {
    paymentMethods: {
      atm: 'all',
      ticket: ['bolbradesco'],
      bankTransfer: ['pix'],
      creditCard: 'all',
      debitCard: 'all',
      maxInstallments: 2,
      mercadoPago: ['onboarding_credits'],
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
