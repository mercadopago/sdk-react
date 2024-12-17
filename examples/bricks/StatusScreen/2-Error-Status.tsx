import React from 'react';
import StatusScreen from '../../../src/bricks/statusScreen';
import { PUBLIC_KEY } from '../../constants';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

const App = () => {
  const initialization = {
    paymentId: '1307907697',
  };

  return <StatusScreen initialization={initialization} onError={(error) => console.error(error)} />;
};

export default App;
