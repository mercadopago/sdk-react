import { create } from 'domain';
import { initBrick } from '.';
import initMercadoPago, { MercadoPagoInstance } from '../../../mercadoPago/initMercadoPago';

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
      controller: 'brickTestController',
    };

    await initBrick(WalletBrickConfig);
    expect(mock).toBeCalledTimes(1);
  });
});
