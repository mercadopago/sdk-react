import React from 'react';
import { PUBLIC_KEY } from '../../constants';
import { initMercadoPago, CardNumber } from '../../../src/index';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

const App = () => {
  return (
    <CardNumber
      placeholder="Card Number"
      style={{ fontFamily: 'sans-serif' }}
      onReady={(event) => console.log('Card number ready!!', event)}
      onError={(error) => console.log(error)}
    />
  );
};

export default App;
