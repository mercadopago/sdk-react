# Wallet Brick

## Content

- [Wallet Brick](#wallet-brick)
  - [Content](#content)
  - [Intro](#intro)
  - [How it works](#how-it-works)
  - [How to use](#how-to-use)
  - [React lifecycle](#react-lifecycle)
  - [Screenshots](#screenshots)
  - [External Links](#external-links)

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

## React lifecycle

Parent state updates and new callback references preserve the current Wallet instance. Equivalent
`initialization` and `customization` values also preserve it, including nested objects with different
property ordering. Callbacks use their latest committed implementation without interrupting a pending
`onSubmit` promise.

Changing initialization or customization values, `locale`, or the container `id` recreates the Brick.
Removing the Wallet from the React tree or changing its React `key` still unmounts it and allows the
underlying SDK to cancel pending work. Cleanup applies only to the controller created by that Wallet.

---

## Screenshots

---

## External Links

[Wallet Brick official documentation](https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/introduction)
