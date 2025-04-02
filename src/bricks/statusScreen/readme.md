# Status Screen Brick

## Content

- [Status Screen Brick](#status-screen-brick)
  - [Content](#content)
  - [Intro](#intro)
  - [How it works](#how-it-works)
  - [How to use](#how-to-use)
  - [Screenshots](#screenshots)
  - [External Links](#external-links)

---

## Intro

Status Screen Brick allows you to show the buyer the status of a purchase made with any payment method provided by Checkout Bricks. With this Brick it is possible to view the purchase summary, as well know the current payment status and view the details of payment tickets.

---

## How it works

This is like a wrapper for the Brick. It breaks the main characteristics - initialization, customizations and callbacks - in _props_ for the component. In this way, it is possible to minimize the impact if the Bricks change and take advantage of the already existent documentation.

---

## How to use

```ts
import { StatusScreen, initMercadoPago } from '@mercadopago/sdk-react';

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
