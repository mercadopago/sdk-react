import React from 'react';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';
import ExpirationYear from '../../../src/secureFields/expirationYear';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

const App = () => {
  return (
    <ExpirationYear
      placeholder='Expiration Year'
      style={{ fontFamily: "sans-serif" }}
      onReady={(event) => console.log('Expiration year ready!!', event)}
      onError={(error) => console.log(error)}
      mode='short'
    />
  );
};

export default App;
