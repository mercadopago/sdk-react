import React from 'react';
import Payment from '../../../src/bricks/payment';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago('TEST-d198443d-7e9f-4e5f-a770-e5b23ae627cb', { locale: 'es-MX' });

const App = () => {
  const initialization = {
    amount: 1000,
    preferenceId: '',
    items: {
      totalItemsAmount: 331.14,
      itemsList: [
        {
          units: 1,
          value: 3.14,
          name: 'Product A',
        },
      ],
    },
    payer: {
      email: 'anasilva@test.com',
      firstName: 'Ana',
      lastName: 'Silva',
    },
    // todo: remove discounts after merge CHOBK-1020 and update beta envinroment
    discounts: {
      totalDiscountsAmount: 10,
      discountsList: [
        {
          name: 'BLACKFRIDAY10',
          value: 10,
        },
      ],
    },
  };

  const customization = {
    enableReviewStep: true,
    paymentMethods: {
      atm: 'all',
      ticket: 'all',
      bankTransfer: ['pix'], // todo: 'all' doesn't works
      debitCard: 'all',
      mercadoPago: 'all',
    },
  };

  const onSubmit = async (param) => {
    console.log(param);
  }

  // todo: remove onError
  const onError = async (error) => {
    console.log(error);
  };

  // todo: remove onReady
  const onReady = async () => {
    console.log('onready');
  };

  return (
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
    />
  );
};

export default App;
