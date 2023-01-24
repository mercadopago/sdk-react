import { create } from 'domain';
import { initBrick } from '.';
import useMercadoPago, { MercadoPagoInstance } from '../../../mercadoPago/useMercadoPago';

declare global {
  interface Window {
    brickTestController: any;
  }
}

describe('Test renderBrick', () => {
  test('should return a render Brick', async () => {
    const mock = jest.fn();
    MercadoPagoInstance.publicKey = 'PUBLIC_KEY';
    MercadoPagoInstance.instanceMercadoPago = {
      bricks: function () {
        return {
          create: mock,
        };
      },
    };

    const WalletBrickConfig = {
      settings: {},
      name: 'brickTest',
      divId: 'brickTest_container',
      controller: window.brickTestController,
    };

    await initBrick(WalletBrickConfig);
    expect(mock).toBeCalledTimes(1);
  });
});
