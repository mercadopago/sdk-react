import React from 'react';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';
import CardNumber from '../../../src/secureFields/cardNumber';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

const App = () => {
  return (
    <CardNumber 
      placeholder='Card Number'
      style={{ fontFamily: "sans-serif" }}
      onReady={() => console.log('Card number ready!!')}
    />
  );
};

export default App;
