import React from 'react';
import Payment from '../../src/bricks/payment';
import useMercadoPago from '../../src/mercadoPago/useMercadoPago';

useMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83');

const App = () => {
  const config = {
    initialization: {
      amount: 100, // valor total a ser pago
    },
    customization: {
      paymentMethods: {
        bankTransfer: ['pix'],
      },
    },
  };

  return (
    <div className="App">
      <Payment config={config} />
    </div>
  );
};

export default App;
