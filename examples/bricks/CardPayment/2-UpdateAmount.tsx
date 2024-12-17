import React from 'react';
import Card, { useCardPaymentBrick } from '../../../src/bricks/cardPayment';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

const App = () => {
  const { update } = useCardPaymentBrick();

  return (
    <>
      <button type="button" onClick={() => update({ amount: 90 })}>
        Update amount
      </button>

      <Card
        initialization={{ amount: 100 }}
        onSubmit={async (param) => {
          console.log(param);
        }}
      />
    </>
  );
};

export default App;
