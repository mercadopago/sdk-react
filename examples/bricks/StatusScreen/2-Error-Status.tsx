import React from 'react';
import { initMercadoPago, StatusScreen } from '../../../src/index';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

const App = () => {
  const initialization = {
    paymentId: '1307907697',
  };

  return <StatusScreen initialization={initialization} onError={(error) => console.error(error)} />;
};

export default App;
