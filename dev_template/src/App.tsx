import React from 'react';
import Payment from '../../src/bricks/payment';
import Wallet from '../../src/bricks/wallet';

import useMercadoPago from '../../src/mercadoPago/useMercadoPago';

useMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83');

const App = () => {
  const config = {
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

  return (
    <div className="App">
      <Wallet
        initialization={{ preferenceId: '207446753-3bfd1c27-1199-40bd-9cef-29bfcaa00bf1' }}
        customization={{ visual: { buttonBackground: 'black' } }}
      />
      <Payment
        config={config}
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
