import { initBrick } from '.';
import { MercadoPagoInstance } from '../../../mercadoPago/initMercadoPago';

declare global {
  interface Window {
    brickTestController: any;
  }
}

describe('Test renderBrick', () => {
  test('should return a render Brick', async () => {
    const createMock = jest.fn();
    MercadoPagoInstance.publicKey = 'PUBLIC_KEY';
    MercadoPagoInstance.getInstance = jest.fn().mockResolvedValue({
      bricks: function () {
        return {
          create: createMock,
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
    });

    const WalletBrickConfig = {
      settings: {},
      name: 'brickTest',
      controller: 'brickTestController',
      containerId: 'brickTest_container',
    };

    await initBrick(WalletBrickConfig);
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenCalledWith('brickTest', 'brickTest_container', {});
  });
});
