import React from 'react';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';
import SecurityCode from '../../../src/secureFields/securityCode';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

const App = () => {
  return (
    <SecurityCode
      placeholder='Security Code'
      style={{ fontFamily: "sans-serif" }}
      onReady={() => console.log('Security code ready!!')}
    />
  );
};

export default App;
