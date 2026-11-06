import React from 'react';
import { act, render } from '@testing-library/react';
import { initBrick } from '../util/renderBrick';
import { DEBOUNCE_TIME_RENDER } from '../util/constants';

jest.mock('../util/renderBrick', () => ({ initBrick: jest.fn() }));
import WalletBrick from './index';
import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';

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

describe('Wallet Order forwarding contract', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.mocked(initBrick).mockClear();
    window.walletBrickController = { unmount: jest.fn() };
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('forwards an initialized pair and callback unchanged across rerender and unmount', async () => {
    const firstPair = { orderId: 'SYNTHETIC_ORDER_A', clientToken: 'SYNTHETIC_TOKEN_A' };
    const secondPair = { orderId: 'SYNTHETIC_ORDER_B', clientToken: 'SYNTHETIC_TOKEN_B' };
    const firstSubmit = jest.fn(async () => firstPair);
    const secondSubmit = jest.fn(async () => secondPair);
    const view = render(<WalletBrick initialization={firstPair} onSubmit={firstSubmit} />);
    act(() => jest.advanceTimersByTime(DEBOUNCE_TIME_RENDER));
    const first = jest.mocked(initBrick).mock.calls[0][0];
    expect(first.settings.initialization).toBe(firstPair);
    expect(first.settings.callbacks.onSubmit).toBe(firstSubmit);
    expect(await first.settings.callbacks.onSubmit()).toBe(firstPair);

    view.rerender(<WalletBrick initialization={secondPair} onSubmit={secondSubmit} />);
    act(() => jest.advanceTimersByTime(DEBOUNCE_TIME_RENDER));
    const second = jest.mocked(initBrick).mock.calls[1][0];
    expect(second.settings.initialization).toBe(secondPair);
    expect(second.settings.callbacks.onSubmit).toBe(secondSubmit);
    expect(await second.settings.callbacks.onSubmit()).toBe(secondPair);
    view.unmount();
    expect(window.walletBrickController.unmount).toHaveBeenCalledTimes(2);
  });

  test('forwards callback-only pair results without creating an initialization source', async () => {
    const pair = { orderId: 'SYNTHETIC_ORDER', clientToken: 'SYNTHETIC_TOKEN' };
    const onSubmit = jest.fn(async () => pair);
    const view = render(<WalletBrick onSubmit={onSubmit} />);
    act(() => jest.advanceTimersByTime(DEBOUNCE_TIME_RENDER));
    const config = jest.mocked(initBrick).mock.calls[0][0];
    expect(config.settings.initialization).toBeUndefined();
    expect(config.settings.callbacks.onSubmit).toBe(onSubmit);
    expect(await config.settings.callbacks.onSubmit()).toBe(pair);
    view.unmount();
  });

  test('cancels a pending debounce on rerender or unmount', () => {
    const onSubmit = async () => ({ orderId: 'SYNTHETIC_ORDER', clientToken: 'SYNTHETIC_TOKEN' });
    const view = render(<WalletBrick onSubmit={onSubmit} />);
    view.rerender(<WalletBrick onSubmit={onSubmit} initialization={{ redirectMode: 'self' }} />);
    view.unmount();
    act(() => jest.advanceTimersByTime(DEBOUNCE_TIME_RENDER));
    expect(initBrick).not.toHaveBeenCalled();
  });
});
