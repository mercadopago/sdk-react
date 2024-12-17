import React from 'react';

import { PUBLIC_KEY } from '../../constants';
import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';
import SecurityCode from '../../../src/secureFields/securityCode';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

const App = () => {
  return (
    <SecurityCode
      placeholder="Security Code"
      style={{ fontFamily: 'sans-serif' }}
      onReady={(event) => console.log('Security code ready!!', event)}
      onError={(error) => console.log(error)}
    />
  );
};

export default App;
