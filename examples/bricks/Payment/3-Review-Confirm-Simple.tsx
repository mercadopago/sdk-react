import React from 'react';
import Payment from '../../../src/bricks/payment';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY, { locale: 'es-MX' });

// This feature is temporarily exclusive for MLM (México) 🇲🇽 and MLA (Argentina) 🇦🇷
const App = () => {
  const initialization = {
    amount: 1000,
    items: {
      totalItemsAmount: 1000,
      itemsList: [
        {
          units: 1,
          value: 1000,
          name: 'Product A',
        },
      ],
    },
  };

  const onSubmit = async () => console.log('Calling onSubmit');

  return (
    <Payment
      initialization={initialization}
      customization={{
        enableReviewStep: true,
        paymentMethods: {
          atm: 'all',
          ticket: 'all',
          bankTransfer: 'all',
          debitCard: 'all',
          mercadoPago: 'all',
        },
      }}
      onSubmit={onSubmit}
    />
  );
};

export default App;
