import React from 'react';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';
import ExpirationDate from '../../../src/secureFields/expirationDate';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

/**
 * IMPORTANT
 * Expiration Date cannot coexist with Expiration Month or Expiration Year
 */

const App = () => {
  return (
    <ExpirationDate
      placeholder='Expiration Date'
      style={{ fontFamily: "sans-serif" }}
      onReady={(event) => console.log('Expiration date ready!!', event)}
      onError={(error) => console.log(error)}
      mode='full'
    />
  );
};

export default App;
