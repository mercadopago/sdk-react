import React from 'react';
import StatusScreen from '../../../src/bricks/statusScreen';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago('TEST-2b00e5a0-b421-4588-b9cb-846a553d760e', { locale: 'pt-BR' });

const App = () => {
  const initialization = {
    paymentId: '1307907697',
  };

  return <StatusScreen initialization={initialization} onError={(error) => console.error(error)} />;
};

export default App;
