import React from 'react';
import Card from '../../../src/bricks/cardPayment';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

const App = () => {
  const customization = {
    paymentMethods: {
      minInstallments: 2,
      maxInstallments: 4,
    },
    visual: {
      style: {
        theme: 'dark',
      },
      hidePaymentButton: true,
    },
  };

  function createPayment() {
    window.cardPaymentBrickController
      .getFormData()
      .then((cardFormData) => {
        console.log('cardFormData received, creating payment...', cardFormData);
      })
      .catch((error) => {});
  }

  return (
    <>
      <Card
        initialization={{ amount: 100 }}
        customization={customization}
        onSubmit={async (param) => {
          console.log(param);
        }}
      />
      <button onClick={() => createPayment()}>Custom Button</button>
    </>
  );
};

export default App;
