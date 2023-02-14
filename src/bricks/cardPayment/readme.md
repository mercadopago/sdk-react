# Card Payment Brick

## Content

1. [Intro](#intro)
2. [How it works](#how-it-works)
3. [How to use](#how-to-use)
4. [Screenshots](#screenshots)
5. [External Links](#external-links)

---

## Intro

Card Payment Brick is a component for your checkout made by MercadoPago. This implementation intents to help React developers to use this brick even faster then using the JS SDK directly.

---

## How it works

This is like a wrapper for the brick. It breaks the main characterists - initialization, customizations and callbacks - in _props_ for the component. In this way it possible have a minimum impact if the bricks change and take advantage of the already existent documentation.

---

## How to use

```ts
import CardPayment, { initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago('YOUR_PUBLIC_KEY');

const Example = () => {
  return <CardPayment initialization={{ amount: AMOUNT }} onSubmit={} />;
};

export default Example;
```

---

## Screenshots

---

## External Links

[Card Payment Brick official documentation](https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/introduction)
