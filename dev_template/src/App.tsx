import React from 'react';
import Payment from '../../src/bricks/payment';
import Wallet from '../../src/bricks/wallet';
import Card from '../../src/bricks/cardPayment';

import useMercadoPago from '../../src/mercadoPago/useMercadoPago';

useMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83');

const App = () => {
  const initialization = {
    amount: 100,
  };

  const paymentCustomization = {
    paymentMethods: {
      atm: 'all',
      ticket: 'all',
      bankTransfer: ['pix'],
      creditCard: 'all',
      debitCard: 'all',
      mercadoPago: 'all',
    },
  };

  const customization = {
    visual: {
      style: {
        theme: 'default',
      },
    },
  };

  return (
    <div className="App">
      <Wallet
        initialization={{ preferenceId: 'YOUR_PREFERENCE_ID' }}
        customization={{ visual: { buttonBackground: 'black' } }}
      />
      <Payment
        initialization={initialization}
        customization={paymentCustomization}
        onSubmit={async (param) => {
          console.log(param);
        }}
        onError={(param) => console.log(param)}
        onReady={() => console.log('Brick Ready!')}
      />
      <Card
        initialization={initialization}
        customization={customization}
        onSubmit={async (param) => {
          console.log(param);
        }}
        onError={(param) => console.log(param)}
        onReady={() => console.log('Brick Ready!')}
      />
    </div>
  );
};

export default App;
