import React from 'react';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';
import ExpirationMonth from '../../../src/secureFields/expirationMonth';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

const App = () => {
  return (
    <ExpirationMonth
      placeholder='Expiration Month'
      style={{ fontFamily: "sans-serif" }}
      onReady={(event) => console.log('Expiration month ready!!', event)}
      onError={(error) => console.log(error)}
    />
  );
};

export default App;
