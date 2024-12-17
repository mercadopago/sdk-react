import { initBrick } from '.';
import { MercadoPagoInstance } from '../../../mercadoPago/initMercadoPago';

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
      getIdentificationTypes: jest.fn(),
      getPaymentMethods: jest.fn(),
      getIssuers: jest.fn(),
      getInstallments: jest.fn(),
      createCardToken: jest.fn(),
      updateCardToken: jest.fn(),
      fields: {
        createCardToken: jest.fn(),
        updateCardToken: jest.fn(),
        create: jest.fn(),
      },
    };

    const WalletBrickConfig = {
      settings: {},
      name: 'brickTest',
      containerIdcontainerId: 'brickTest_container',
      controller: 'brickTestController',
    };

    await initBrick(WalletBrickConfig);
    expect(mock).toBeCalledTimes(1);
  });
});
