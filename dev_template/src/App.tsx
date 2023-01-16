import React from 'react';
import Payment from '../../src/bricks/payment';

export default function App() {
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
}
