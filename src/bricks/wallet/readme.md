# Wallet Brick

## Content

- [Wallet Brick](#wallet-brick)
  - [Content](#content)
  - [Intro](#intro)
  - [How it works](#how-it-works)
  - [How to use](#how-to-use)
  - [Screenshots](#screenshots)
  - [External Links](#external-links)
  - [Wallet with Orders](#wallet-with-orders)

---

## Intro

Wallet Brick allows you to offer payments from your Mercado Pago account at any stage of the purchase process. This Brick can be implemented through a direct and customized integration that allows: fast payments, safe environment and increase in payment approval rate.

---

## How it works

This is like a wrapper for the Brick. It breaks the main characteristics - initialization, customizations and callbacks - in _props_ for the component. In this way, it is possible to minimize the impact if the Bricks change and take advantage of the already existent documentation.

---

## How to use

```ts
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago('YOUR_PUBLIC_KEY');

const Example = () => {
  return <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>' }} />;
};

export default Example;
```

---

## Screenshots

---

## External Links

[Wallet Brick official documentation](https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/introduction)

## Wallet with Orders

Requires a compatible Mercado Pago JavaScript SDK and Wallet Brick release with
Wallet Orders support.

The seller backend provisions the complete Order ID/client-token pair. Pass that
pair at initialization or return it from the existing asynchronous `onSubmit`.
The callback may also return a Preference ID string; only `null`, `undefined`,
`void` or the empty string falls back to the initialized source. A partial pair,
rejection or failed lookup never mixes sources or falls back to Preference.

```tsx
import React from 'react';
import { Wallet } from '@mercadopago/sdk-react';
import type { WalletOrderCredentials } from '@mercadopago/sdk-react';

const OrderWallet = ({ order }: { order: WalletOrderCredentials }) => (
  <Wallet initialization={{ ...order, redirectMode: 'self' }} />
);

declare function getOrderFromSellerBackend(): Promise<WalletOrderCredentials>;
const CallbackWallet = () => <Wallet onSubmit={getOrderFromSellerBackend} />;
const CallbackFirstWallet = ({ order }: { order: WalletOrderCredentials }) => (
  <Wallet initialization={order} onSubmit={getOrderFromSellerBackend} />
);
```

`WalletOrderCredentials` is exported from `@mercadopago/sdk-react`. Seller Access
Tokens stay on the backend. Never put a client token in a URL, persistent storage, logs or
tracking, and never supply `checkoutUrl` to the React Wallet. An associated Preference
ID/purpose is presentation metadata and never reconstructs navigation. Refresh or
expired-token recovery requires a newly provisioned valid backend pair.

When iframe compatibility is unavailable, modal mode may fall back to same-window
navigation with an SDK warning. Blank mode uses an asynchronous popup and may be
blocked by the browser.
