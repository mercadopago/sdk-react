import React from 'react';
import StatusScreen from '../../../src/bricks/statusScreen';

import useMercadoPago from '../../../src/mercadoPago/useMercadoPago';

useMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

const App = () => {
  const initialization = {
    paymentId: '1311946695'
  };

  return (
    <StatusScreen
      initialization={initialization}
      customization={{ visual: { hideStatusDetails: true, hideTransactionDate: true } }}
    />
  );
};

export default App;
