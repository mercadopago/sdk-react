# Payment Brick

## Content

- [Payment Brick](#payment-brick)
  - [Content](#content)
  - [Intro](#intro)
  - [How it works](#how-it-works)
  - [How to use](#how-to-use)
  - [Screenshots](#screenshots)
  - [External Links](#external-links)

---

## Intro

Payment Brick is a modular and customizable solution that allows you to add several payment methods to your store with just one Brick, allowing you to save card data for future purchases. By using Payment Brick, you will have different payment methods at your disposal and you will be able to choose which ones to enable for your site.

---

## How it works

This is like a wrapper for the Brick. It breaks the main characteristics - initialization, customizations and callbacks - in _props_ for the component. In this way, it is possible to minimize the impact if the Bricks change and take advantage of the already existent documentation.

---

## How to use

```ts
import { Payment, initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago('YOUR_PUBLIC_KEY');

const Example = () => {
  return (
    <Payment
      initialization={{ amount: AMOUNT }}
      customization={{ paymentMethods: ['PAYMENT_METHODS'] }}
      onSubmit={async () => {}}
    />
  );
};

export default Example;
```

---

## Screenshots

---

## External Links

[Payment Brick official documentation](https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/introduction)
