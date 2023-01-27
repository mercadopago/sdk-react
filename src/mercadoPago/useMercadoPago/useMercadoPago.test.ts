import useMercadoPago, { MercadoPagoInstance } from '.';
import * as addScriptMercadoPago from '../loadMercadoPago';

describe('Test useMercadoPago', () => {
  beforeEach(() => {
    jest
      .spyOn(addScriptMercadoPago, 'loadMercadoPago')
      .mockImplementation(() => Promise.resolve({}));
    MercadoPagoInstance.publicKey = null;
    MercadoPagoInstance.instanceMercadoPago = '';
  });

  test('should set the publicKey instance', () => {
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
    useMercadoPago(PUBLIC_KEY);
    expect(MercadoPagoInstance.publicKey).toBe(PUBLIC_KEY);
  });

  test('should show console.error if the public key is not set', () => {
    const logSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

    MercadoPagoInstance.init();

    expect(logSpy).toHaveBeenCalledTimes(1);

    logSpy.mockRestore();
  });

  test('should return a instance MercadoPago', async () => {
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
    const mockMercadoPagoBrick = jest.fn();
    const mock = jest.fn().mockImplementation(() => {
      return { brick: mockMercadoPagoBrick };
    });
    window.MercadoPago = mock;

    useMercadoPago(PUBLIC_KEY);
    await MercadoPagoInstance.init();

    expect(MercadoPagoInstance.publicKey).toBe(PUBLIC_KEY);
    expect(MercadoPagoInstance.instanceMercadoPago.brick).toBe(mockMercadoPagoBrick);

    await MercadoPagoInstance.init();
    expect(MercadoPagoInstance.instanceMercadoPago.brick).toBe(mockMercadoPagoBrick);
  });
});
