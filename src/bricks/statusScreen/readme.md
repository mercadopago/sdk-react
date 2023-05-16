# Status Screen Brick

## Content

1. [Intro](#intro)
2. [How it works](#how-it-works)
3. [How to use](#how-to-use)
4. [Screenshots](#screenshots)
5. [External Links](#external-links)

---

## Intro

Status Screen Brick allows you to show the buyer the status of a purchase made with any payment method provided by Checkout Bricks. With this Brick it is possible to view the purchase summary, as well know the current payment status and view the details of payment tickets.

---

## How it works

This is like a wrapper for the brick. It breaks the main characterists - initialization, customizations and callbacks - in _props_ for the component. In this way it possible have a minimum impact if the bricks change and take advantage of the already existent documentation.

---

## How to use

```ts
import StatusScreen, { initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago('YOUR_PUBLIC_KEY');

const Example = () => {
  return (
    <StatusScreen
      initialization={{ preferenceId: '<PREFERENCE_ID>' }}
      onReady={() => {}}
      onError={() => {}}
    />
  );
};

export default Example;
```

---

## Screenshots

---

## External Links

[Status Screen Brick official documentation](https://www.mercadopago.com/developers/en/docs/checkout-bricks/status-screen-brick/introduction)
