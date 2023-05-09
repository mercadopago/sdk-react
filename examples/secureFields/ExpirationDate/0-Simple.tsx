import React from 'react';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';
import ExpirationDate from '../../../src/secureFields/expirationDate';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

const App = () => {
  return (
    <ExpirationDate
      placeholder='Expiration Date'
      style={{ fontFamily: "sans-serif" }}
      onReady={() => console.log('Expiration date ready!!')}
      mode='full'
    />
  );
};

export default App;
