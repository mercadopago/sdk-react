import React from 'react';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';
import ExpirationYear from '../../../src/secureFields/expirationYear';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

const App = () => {
  return (
    <ExpirationYear
      placeholder='Expiration Year'
      style={{ fontFamily: "monospace" }}
      onReady={() => console.log('Expiration year ready!!')}
    />
  );
};

export default App;
