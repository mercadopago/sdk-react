import React from 'react';
import { PUBLIC_KEY } from '../../constants';
import { initMercadoPago, ExpirationDate } from '../../../src/index';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

/**
 * IMPORTANT
 * Expiration Date cannot coexist with Expiration Month or Expiration Year
 */

const App = () => {
  return (
    <ExpirationDate
      placeholder="Expiration Date"
      style={{ fontFamily: 'sans-serif' }}
      onReady={(event) => console.log('Expiration date ready!!', event)}
      onError={(error) => console.log(error)}
      mode="full"
    />
  );
};

export default App;
