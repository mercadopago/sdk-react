import React from 'react';
import { initMercadoPago, CardPayment } from '../../../src/index';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

const App = () => {
  return (
    <CardPayment
      initialization={{ amount: 100 }}
      id="custom-container-id"
      onSubmit={async (param) => {
        console.log(param);
      }}
    />
  );
};

export default App;
