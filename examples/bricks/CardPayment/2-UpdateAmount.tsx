import React, { useState } from 'react';
import Card from '../../../src/bricks/cardPayment';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

const App = () => {
  const initialAmount = 100;
  const [amount, setAmount] = useState(initialAmount);
  const updateAmount = () => {
    setAmount(90);
  };

  return (
    <>
      <button type="button" onClick={updateAmount}>
        Update amount
      </button>

      <Card
        initialization={{ amount }}
        onSubmit={async (param) => {
          console.log(param);
        }}
      />
    </>
  );
};

export default App;
