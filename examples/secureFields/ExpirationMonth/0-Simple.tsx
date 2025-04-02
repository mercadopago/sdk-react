import React from 'react';
import { PUBLIC_KEY } from '../../constants';
import { initMercadoPago, ExpirationMonth } from '../../../src/index';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

const App = () => {
  return (
    <ExpirationMonth
      placeholder="Expiration Month"
      style={{ fontFamily: 'sans-serif' }}
      onReady={(event) => console.log('Expiration month ready!!', event)}
      onError={(error) => console.log(error)}
    />
  );
};

export default App;
