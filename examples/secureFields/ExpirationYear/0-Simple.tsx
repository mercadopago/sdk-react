import React from 'react';

import { PUBLIC_KEY } from '../../constants';
import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';
import ExpirationYear from '../../../src/secureFields/expirationYear';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

const App = () => {
  return (
    <ExpirationYear
      placeholder="Expiration Year"
      style={{ fontFamily: 'sans-serif' }}
      onReady={(event) => console.log('Expiration year ready!!', event)}
      onError={(error) => console.log(error)}
      mode="short"
    />
  );
};

export default App;
