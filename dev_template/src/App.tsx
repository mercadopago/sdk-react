import React, { useEffect, useState } from 'react';
import Wallet from '../../src/bricks/wallet';

import useMercadoPago from '../../src/mercadoPago/useMercadoPago';

useMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83');

const App = () => {
  const [state, setState] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setState(!state)}>teste</button>
      <Wallet
        initialization={{ preferenceId: '207446753-3bfd1c27-1199-40bd-9cef-29bfcaa00bf1' }}
        customization={{ visual: { buttonBackground: 'black' } }}
        onReady={() => setState(!state)}
      />
      {state && <p>Loading...</p>}
    </div>
  );
};

export default App;
