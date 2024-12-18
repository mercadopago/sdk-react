import React from 'react';
import StatusScreen from '../../../src/bricks/statusScreen';
import { PUBLIC_KEY } from '../../constants';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';
import { IStatusScreenBrickInitialization } from '../../../src/bricks/statusScreen/types';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

const App = () => {
  const initialization: IStatusScreenBrickInitialization = {
    paymentId: '1307907697',
    additionalInfo: {
      externalResourceURL: 'https://eoql5ybmp0gwf41.m.pipedream.net',
      creq: 'teste',
    },
  };

  return <StatusScreen initialization={initialization} onError={(error) => console.error(error)} />;
};

export default App;
