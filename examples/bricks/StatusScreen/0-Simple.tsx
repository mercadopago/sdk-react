import React from 'react';
import { initMercadoPago, StatusScreen } from '../../../src/index';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

const App = () => {
  const initialization = {
    paymentId: '1311946695',
  };

  return <StatusScreen initialization={initialization} />;
};

export default App;
