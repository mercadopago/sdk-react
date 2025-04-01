import React from 'react';
import { initMercadoPago, Payment } from '../../../src/index';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

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
      prepaidCard: 'all',
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
