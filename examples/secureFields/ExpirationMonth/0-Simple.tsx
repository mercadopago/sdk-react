import React from 'react';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';
import ExpirationMonth from '../../../src/secureFields/expirationMonth';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

const App = () => {
  return (
    <ExpirationMonth
      placeholder='Expiration Month'
      style={{ fontFamily: "sans-serif" }}
      onReady={() => console.log('Expiration month ready!!')}
    />
  );
};

export default App;
