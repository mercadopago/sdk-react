import React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import WalletBrick from './index';
import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';
import type { BrickController, TInstanceMercadoPago } from '../../mercadoPago/initMercadoPago/type';
import type { IBrickError } from '../util/types/common';
import type { TWallet } from './types';

describe('Test Wallet Brick Component', () => {
  test('should found the id of Wallet Brick div', async () => {
    MercadoPagoInstance.publicKey = 'PUBLIC_KEY';
    const element = await render(
      <WalletBrick initialization={{ preferenceId: '<PREFERENCE_ID>' }} />,
    );

    expect(element.container.querySelector('#walletBrick_container')).toBeTruthy();
  });

  test('should found the id of Wallet Brick div if specified', async () => {
    MercadoPagoInstance.publicKey = 'PUBLIC_KEY';
    const element = await render(
      <WalletBrick
        initialization={{ preferenceId: '<PREFERENCE_ID>' }}
        id="customWalletBrick_container"
      />,
    );

    expect(element.container.querySelector('#customWalletBrick_container')).toBeTruthy();
  });
});

type WalletSettings = {
  initialization?: TWallet['initialization'];
  customization?: TWallet['customization'];
  locale?: TWallet['locale'];
  callbacks: {
    onReady: () => void;
    onError: (error: IBrickError) => void;
    onSubmit: () => Promise<unknown>;
  };
};

function deferred<Value>() {
  let resolve!: (value: Value) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<Value>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

describe('Wallet Brick lifecycle', () => {
  let controller: BrickController;
  let createMock: jest.Mock<Promise<BrickController>, [string, string, WalletSettings]>;
  let instance: TInstanceMercadoPago;
  let getInstanceMock: jest.SpyInstance;
  const initialization = { preferenceId: 'preference-id' };
  const error: IBrickError = {
    type: 'non_critical',
    cause: 'test_failure',
    message: 'Test failure',
  };

  const flushRender = async () => {
    await act(async () => {
      jest.advanceTimersByTime(200);
    });
  };

  beforeEach(() => {
    jest.useFakeTimers();
    controller = { unmount: jest.fn() };
    createMock = jest.fn().mockResolvedValue(controller);
    instance = { bricks: () => ({ create: createMock }) } as TInstanceMercadoPago;
    getInstanceMock = jest.spyOn(MercadoPagoInstance, 'getInstance').mockResolvedValue(instance);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
    delete window.walletBrickController;
  });

  test('preserves a pending submit when a parent rerenders with inline props and the same key', async () => {
    const pending = deferred<string>();
    const firstSubmit = jest.fn(() => pending.promise);
    const nextSubmit = jest.fn().mockResolvedValue('next-preference');
    const element = render(
      <WalletBrick
        key="stable"
        initialization={{ redirectMode: 'self' }}
        onReady={() => undefined}
        onSubmit={firstSubmit}
      />,
    );
    await flushRender();
    const callbacks = createMock.mock.calls[0][2].callbacks;
    const submission = callbacks.onSubmit();

    element.rerender(
      <WalletBrick
        key="stable"
        initialization={{ redirectMode: 'self' }}
        onReady={() => undefined}
        onSubmit={nextSubmit}
      />,
    );
    await flushRender();
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(controller.unmount).not.toHaveBeenCalled();
    pending.resolve('real-preference');
    await expect(submission).resolves.toBe('real-preference');
    expect(firstSubmit).toHaveBeenCalledTimes(1);
    expect(nextSubmit).not.toHaveBeenCalled();
    await expect(callbacks.onSubmit()).resolves.toBe('next-preference');
  });

  test('compares nested configuration values independently of property order', async () => {
    const element = render(
      <WalletBrick
        initialization={{ preferenceId: 'preference-id', redirectMode: 'self' }}
        customization={{
          theme: 'default',
          customStyle: { buttonHeight: '48px', borderRadius: '6px' },
        }}
      />,
    );
    await flushRender();
    element.rerender(
      <WalletBrick
        initialization={{ redirectMode: 'self', preferenceId: 'preference-id' }}
        customization={{
          customStyle: { borderRadius: '6px', buttonHeight: '48px' },
          theme: 'default',
        }}
      />,
    );
    await flushRender();
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(controller.unmount).not.toHaveBeenCalled();
  });

  test('forwards ready and error events to the latest committed callbacks', async () => {
    const firstReady = jest.fn();
    const firstError = jest.fn();
    const nextReady = jest.fn();
    const nextError = jest.fn();
    const element = render(
      <WalletBrick initialization={initialization} onReady={firstReady} onError={firstError} />,
    );
    await flushRender();
    const callbacks = createMock.mock.calls[0][2].callbacks;
    element.rerender(
      <WalletBrick initialization={initialization} onReady={nextReady} onError={nextError} />,
    );
    callbacks.onReady();
    callbacks.onError(error);
    expect(firstReady).not.toHaveBeenCalled();
    expect(firstError).not.toHaveBeenCalled();
    expect(nextReady).toHaveBeenCalledTimes(1);
    expect(nextError).toHaveBeenCalledWith(error);
    expect(controller.unmount).not.toHaveBeenCalled();
  });

  test('restores default callbacks when optional callbacks are removed', async () => {
    const onReady = jest.fn();
    const onError = jest.fn();
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const element = render(
      <WalletBrick initialization={initialization} onReady={onReady} onError={onError} />,
    );
    await flushRender();
    element.rerender(<WalletBrick initialization={initialization} />);
    const callbacks = createMock.mock.calls[0][2].callbacks;
    callbacks.onReady();
    callbacks.onError(error);
    await expect(callbacks.onSubmit()).resolves.toBeUndefined();
    expect(onReady).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalledWith(error);
    expect(createMock).toHaveBeenCalledTimes(1);
  });

  test.each<[string, TWallet]>([
    ['preference', { initialization: { preferenceId: 'another-preference' } }],
    ['redirect mode', { initialization: { ...initialization, redirectMode: 'blank' } }],
    ['marketplace', { initialization: { ...initialization, marketplace: true } }],
    ['customization', { initialization, customization: { customStyle: { buttonHeight: '56px' } } }],
    ['locale', { initialization, locale: 'es-CO' }],
    ['container id', { initialization, id: 'another-container' }],
  ])('recreates the instance when %s changes', async (_name, props) => {
    const nextController = { unmount: jest.fn() };
    createMock.mockResolvedValueOnce(controller).mockResolvedValueOnce(nextController);
    const element = render(<WalletBrick initialization={initialization} />);
    await flushRender();
    element.rerender(<WalletBrick {...props} />);
    expect(controller.unmount).toHaveBeenCalledTimes(1);
    await flushRender();
    expect(createMock).toHaveBeenCalledTimes(2);
    expect(createMock.mock.calls[1][1]).toBe(props.id || 'walletBrick_container');
    expect(createMock.mock.calls[1][2].locale).toBe(props.locale);
    expect(window.walletBrickController).toBe(nextController);
  });

  test('unmounts on an actual React key change', async () => {
    const element = render(<WalletBrick key="first" initialization={initialization} />);
    await flushRender();
    element.rerender(<WalletBrick key="second" initialization={initialization} />);
    expect(controller.unmount).toHaveBeenCalledTimes(1);
    await flushRender();
    expect(createMock).toHaveBeenCalledTimes(2);
  });

  test('cleans up only its own controller when two Wallets are mounted', async () => {
    const secondController = { unmount: jest.fn() };
    createMock.mockResolvedValueOnce(controller).mockResolvedValueOnce(secondController);
    const first = render(<WalletBrick id="first-wallet" initialization={initialization} />);
    await flushRender();
    const second = render(<WalletBrick id="second-wallet" initialization={initialization} />);
    await flushRender();
    first.unmount();
    expect(controller.unmount).toHaveBeenCalledTimes(1);
    expect(secondController.unmount).not.toHaveBeenCalled();
    expect(window.walletBrickController).toBe(secondController);
    second.unmount();
    expect(secondController.unmount).toHaveBeenCalledTimes(1);
    expect(window.walletBrickController).toBeUndefined();
  });

  test('cancels the debounce when removed before creation', async () => {
    const element = render(<WalletBrick initialization={initialization} />);
    element.unmount();
    await flushRender();
    expect(getInstanceMock).not.toHaveBeenCalled();
  });

  test('does not create after unmount while SDK loading is pending', async () => {
    const loading = deferred<TInstanceMercadoPago>();
    getInstanceMock.mockReturnValueOnce(loading.promise);
    const element = render(<WalletBrick initialization={initialization} />);
    await flushRender();
    element.unmount();
    await act(async () => loading.resolve(instance));
    expect(createMock).not.toHaveBeenCalled();
  });

  test('disposes a late controller and ignores callbacks from a removed generation', async () => {
    const creation = deferred<BrickController>();
    const onReady = jest.fn();
    const onError = jest.fn();
    const onSubmit = jest.fn().mockResolvedValue('preference');
    createMock.mockReturnValueOnce(creation.promise);
    const element = render(<WalletBrick onReady={onReady} onError={onError} onSubmit={onSubmit} />);
    await flushRender();
    const callbacks = createMock.mock.calls[0][2].callbacks;
    element.unmount();
    callbacks.onReady();
    callbacks.onError(error);
    await expect(callbacks.onSubmit()).resolves.toBeUndefined();
    await act(async () => creation.resolve(controller));
    expect(onReady).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(controller.unmount).toHaveBeenCalledTimes(1);
    expect(window.walletBrickController).toBeUndefined();
  });

  test('waits for a stale creation to be disposed before creating its replacement', async () => {
    const creation = deferred<BrickController>();
    const nextController = { unmount: jest.fn() };
    createMock.mockReturnValueOnce(creation.promise).mockResolvedValueOnce(nextController);
    const element = render(<WalletBrick initialization={initialization} />);
    await flushRender();
    element.rerender(<WalletBrick initialization={{ preferenceId: 'next-preference' }} />);
    await flushRender();
    expect(createMock).toHaveBeenCalledTimes(1);
    await act(async () => creation.resolve(controller));
    expect(controller.unmount).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenCalledTimes(2);
    expect(window.walletBrickController).toBe(nextController);
    expect(nextController.unmount).not.toHaveBeenCalled();
  });

  test('forwards creation failures and can create again after a configuration change', async () => {
    const onError = jest.fn();
    createMock.mockRejectedValueOnce(error).mockResolvedValueOnce(controller);
    const element = render(<WalletBrick initialization={initialization} onError={onError} />);
    await flushRender();
    expect(onError).toHaveBeenCalledWith(error);
    element.rerender(
      <WalletBrick initialization={{ preferenceId: 'next-preference' }} onError={onError} />,
    );
    await flushRender();
    expect(createMock).toHaveBeenCalledTimes(2);
    expect(window.walletBrickController).toBe(controller);
  });

  test('ignores a creation rejection after unmount', async () => {
    const creation = deferred<BrickController>();
    const onError = jest.fn();
    createMock.mockReturnValueOnce(creation.promise);
    const element = render(<WalletBrick initialization={initialization} onError={onError} />);
    await flushRender();
    element.unmount();
    await act(async () => creation.reject(error));
    expect(onError).not.toHaveBeenCalled();
  });

  test('leaves SDK initialization diagnostics unchanged when no instance is available', async () => {
    getInstanceMock.mockResolvedValueOnce(undefined);
    render(<WalletBrick initialization={initialization} />);
    await flushRender();
    expect(createMock).not.toHaveBeenCalled();
  });

  test('creates and cleans up once under React StrictMode', async () => {
    const element = render(
      <React.StrictMode>
        <WalletBrick initialization={initialization} />
      </React.StrictMode>,
    );
    await flushRender();
    expect(createMock).toHaveBeenCalledTimes(1);
    element.unmount();
    expect(controller.unmount).toHaveBeenCalledTimes(1);
  });
});
