import React from 'react';

import { PUBLIC_KEY } from '../../constants';
import { initMercadoPago, ExpirationYear } from '../../../src/index';

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
