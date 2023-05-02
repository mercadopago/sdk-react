# Wallet Brick

## Content

1. [Intro](#intro)
2. [How it works](#how-it-works)
3. [How to use](#how-to-use)
4. [Screenshots](#screenshots)
5. [External Links](#external-links)

---

## Intro

Wallet Brick allows you to offer payments from your Mercado Pago account at any stage of the purchase process. This Brick can be implemented through a direct and customized integration that allows: fast payments, safe environment and increase in payment approval rate.

---

## How it works

This is like a wrapper for the brick. It breaks the main characterists - initialization, customizations and callbacks - in _props_ for the component. In this way it possible have a minimum impact if the bricks change and take advantage of the already existent documentation.

---

## How to use

```ts
import Wallet, { initMercadoPago } from '@mercadopago/sdk-react';

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
