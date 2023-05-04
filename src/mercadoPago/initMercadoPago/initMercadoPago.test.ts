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

    MercadoPagoInstance.init();

    expect(logSpy).toHaveBeenCalledTimes(1);

    logSpy.mockRestore();
  });

  test('should change public key and options', () => {
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
    const OTHER_PUBLIC_KEY = 'YOUR_NEW_PUBLIC_KEY';
    initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });
    expect(MercadoPagoInstance.publicKey).toBe(PUBLIC_KEY);
    expect(MercadoPagoInstance.options).toStrictEqual({ frontEndStack: 'react', locale: 'pt-BR' });
    initMercadoPago(OTHER_PUBLIC_KEY, { locale: 'es-CL' });
    expect(MercadoPagoInstance.publicKey).toBe(OTHER_PUBLIC_KEY);
    expect(MercadoPagoInstance.options).toStrictEqual({ frontEndStack: 'react', locale: 'es-CL' });
  });

  test('should return a instance MercadoPago', async () => {
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
    const mockMercadoPagoBrick = jest.fn();
    const mock = jest.fn().mockImplementation(() => {
      return { bricks: mockMercadoPagoBrick };
    });
    window.MercadoPago = mock;

    initMercadoPago(PUBLIC_KEY);
    await MercadoPagoInstance.init();

    expect(MercadoPagoInstance.publicKey).toBe(PUBLIC_KEY);
    expect(MercadoPagoInstance.instanceMercadoPago?.bricks).toBe(mockMercadoPagoBrick);

    await MercadoPagoInstance.init();
    expect(MercadoPagoInstance.instanceMercadoPago?.bricks).toBe(mockMercadoPagoBrick);
  });
});
