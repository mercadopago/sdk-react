import React from 'react';
import StatusScreen from '../../../src/bricks/statusScreen';
import { PUBLIC_KEY } from '../../constants';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

const App = () => {
  const initialization = {
    paymentId: '1311946695',
  };

  return (
    <StatusScreen
      initialization={initialization}
      customization={{ visual: { hideStatusDetails: true, hideTransactionDate: true } }}
    />
  );
};

export default App;
