# Card Payment Brick

## Content

- [Card Payment Brick](#card-payment-brick)
  - [Content](#content)
  - [Intro](#intro)
  - [How it works](#how-it-works)
  - [How to use](#how-to-use)
  - [Screenshots](#screenshots)
  - [External Links](#external-links)

---

## Intro

Card Payment Brick is a component for your checkout made by MercadoPago. This implementation intents to help React developers to use this brick even faster then using the JS SDK directly.

---

## How it works

This is like a wrapper for the Brick. It breaks the main characteristics - initialization, customizations and callbacks - in _props_ for the component. In this way, it is possible to minimize the impact if the Bricks change and take advantage of the already existent documentation.

---

## How to use

```ts
import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';

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
