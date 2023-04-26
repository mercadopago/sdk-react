import initMercadoPago, { MercadoPagoInstance } from '.';
import * as addScriptMercadoPago from '@mercadopago/sdk-js';

describe('Test initMercadoPago', () => {
  beforeEach(() => {
    jest
      .spyOn(addScriptMercadoPago, 'loadMercadoPago')
      .mockImplementation(() => Promise.resolve({}));
    MercadoPagoInstance.publicKey = null;
    MercadoPagoInstance.instanceMercadoPago = undefined;
  });

  test('should set the publicKey instance', () => {
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
    initMercadoPago(PUBLIC_KEY);
    expect(MercadoPagoInstance.publicKey).toBe(PUBLIC_KEY);
  });

  test('should show console.error if the public key is not set', () => {
    const logSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

    MercadoPagoInstance.getInstance();

    expect(logSpy).toHaveBeenCalledTimes(1);

    logSpy.mockRestore();
  });

  test('should return a instance MercadoPago', async () => {
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
    const mockMercadoPagoBrick = jest.fn();
    const mock = jest.fn().mockImplementation(() => {
      return { bricks: mockMercadoPagoBrick };
    });
    window.MercadoPago = mock;

    initMercadoPago(PUBLIC_KEY);
    await MercadoPagoInstance.getInstance();

    expect(MercadoPagoInstance.publicKey).toBe(PUBLIC_KEY);
    expect(MercadoPagoInstance.instanceMercadoPago?.bricks).toBe(mockMercadoPagoBrick);

    await MercadoPagoInstance.getInstance();
    expect(MercadoPagoInstance.instanceMercadoPago?.bricks).toBe(mockMercadoPagoBrick);
  });
});
