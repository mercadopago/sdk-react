import React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import WalletBrick from './index';
import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';
import type { BrickController, TInstanceMercadoPago } from '../../mercadoPago/initMercadoPago/type';
import type { TWallet } from './types';

function deferred<Value>() {
  let resolve!: (value: Value) => void;
  const promise = new Promise<Value>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

describe('Wallet Order forwarding contract', () => {
  let controller: BrickController;
  let createMock: jest.Mock<
    Promise<BrickController>,
    [
      string,
      string,
      {
        initialization?: TWallet['initialization'];
        callbacks: { onSubmit: () => Promise<unknown> };
      },
    ]
  >;
  let getInstanceMock: jest.SpyInstance;

  const flushRender = async () => {
    await act(async () => {
      jest.advanceTimersByTime(200);
    });
  };

  beforeEach(() => {
    jest.useFakeTimers();
    controller = { unmount: jest.fn() };
    createMock = jest.fn().mockResolvedValue(controller);
    const instance = { bricks: () => ({ create: createMock }) } as TInstanceMercadoPago;
    getInstanceMock = jest.spyOn(MercadoPagoInstance, 'getInstance').mockResolvedValue(instance);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
    delete window.walletBrickController;
  });

  test('forwards initialized Order pairs and callback results across configuration changes', async () => {
    const firstPair = { orderId: 'SYNTHETIC_ORDER_A', clientToken: 'SYNTHETIC_TOKEN_A' };
    const secondPair = { orderId: 'SYNTHETIC_ORDER_B', clientToken: 'SYNTHETIC_TOKEN_B' };
    const firstSubmit = jest.fn(async () => firstPair);
    const secondSubmit = jest.fn(async () => secondPair);
    const nextController = { unmount: jest.fn() };
    createMock.mockResolvedValueOnce(controller).mockResolvedValueOnce(nextController);
    const element = render(<WalletBrick initialization={firstPair} onSubmit={firstSubmit} />);
    await flushRender();
    const first = createMock.mock.calls[0][2];
    expect(first.initialization).toEqual(firstPair);
    await expect(first.callbacks.onSubmit()).resolves.toBe(firstPair);

    element.rerender(<WalletBrick initialization={secondPair} onSubmit={secondSubmit} />);
    await flushRender();
    expect(createMock).toHaveBeenCalledTimes(2);
    const second = createMock.mock.calls[1][2];
    expect(second.initialization).toEqual(secondPair);
    await expect(second.callbacks.onSubmit()).resolves.toBe(secondPair);
    expect(firstSubmit).toHaveBeenCalledTimes(1);
    expect(secondSubmit).toHaveBeenCalledTimes(1);
    expect(controller.unmount).toHaveBeenCalledTimes(1);
    element.unmount();
    expect(nextController.unmount).toHaveBeenCalledTimes(1);
  });

  test('forwards callback-only Order pairs without creating an initialization source', async () => {
    const pair = { orderId: 'SYNTHETIC_ORDER', clientToken: 'SYNTHETIC_TOKEN' };
    const onSubmit = jest.fn(async () => pair);
    render(<WalletBrick onSubmit={onSubmit} />);
    await flushRender();
    const settings = createMock.mock.calls[0][2];
    expect(settings.initialization).toBeUndefined();
    await expect(settings.callbacks.onSubmit()).resolves.toBe(pair);
  });

  test('preserves an in-flight Order submit across equivalent inline props', async () => {
    const pair = { orderId: 'SYNTHETIC_ORDER', clientToken: 'SYNTHETIC_TOKEN' };
    const nextPair = { orderId: 'SYNTHETIC_NEXT_ORDER', clientToken: 'SYNTHETIC_NEXT_TOKEN' };
    const pending = deferred<typeof pair>();
    const firstSubmit = jest.fn(() => pending.promise);
    const nextSubmit = jest.fn(async () => nextPair);
    const element = render(<WalletBrick initialization={{ ...pair }} onSubmit={firstSubmit} />);
    await flushRender();
    const callbacks = createMock.mock.calls[0][2].callbacks;
    const submission = callbacks.onSubmit();
    element.rerender(<WalletBrick initialization={{ ...pair }} onSubmit={nextSubmit} />);
    await flushRender();
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(controller.unmount).not.toHaveBeenCalled();
    pending.resolve(pair);
    await expect(submission).resolves.toBe(pair);
    await expect(callbacks.onSubmit()).resolves.toBe(nextPair);
    expect(firstSubmit).toHaveBeenCalledTimes(1);
    expect(nextSubmit).toHaveBeenCalledTimes(1);
  });

  test('cancels pending Order creation across configuration changes and unmount', async () => {
    const onSubmit = async () => ({ orderId: 'SYNTHETIC_ORDER', clientToken: 'SYNTHETIC_TOKEN' });
    const element = render(<WalletBrick onSubmit={onSubmit} />);
    element.rerender(<WalletBrick onSubmit={onSubmit} initialization={{ redirectMode: 'self' }} />);
    element.unmount();
    await flushRender();
    expect(getInstanceMock).not.toHaveBeenCalled();
    expect(createMock).not.toHaveBeenCalled();
  });
});
