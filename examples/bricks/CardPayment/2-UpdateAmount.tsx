import React from 'react';
import { initMercadoPago, CardPayment, useCardPaymentBrick } from '../../../src/index';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

const App = () => {
  const { update } = useCardPaymentBrick();

  return (
    <>
      <button type="button" onClick={() => update({ amount: 90 })}>
        Update amount
      </button>

      <CardPayment
        initialization={{ amount: 100 }}
        onSubmit={async (param: unknown) => {
          console.log(param);
        }}
      />
    </>
  );
};

export default App;
