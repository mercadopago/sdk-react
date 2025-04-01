# Brand Brick

This Brick is temporarily exclusive for MLA (Argentina) 🇦🇷

## Content

- [Brand Brick](#brand-brick)
  - [Content](#content)
  - [Intro](#intro)
  - [How it works](#how-it-works)
  - [How to use](#how-to-use)
  - [External Links](#external-links)

---

## Intro

Brand Brick communicates to the user advantages, conveniences, and information, such as: the available payment methods via Mercado Pago, accepted card networks, and the option to pay in installments with or without a credit card.

---

## How it works

This is like a wrapper for the Brick. It breaks the main characteristics - customizations and callback - in _props_ for the component. In this way, it is possible to minimize the impact if the Bricks change and take advantage of the already existent documentation.

---

## How to use

```ts
import { Brand, initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago('YOUR_PUBLIC_KEY');

const Example = () => {
  return <Brand />;
};

export default Example;
```

---

## External Links

[Brand Brick official documentation](https://www.mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/introduction)
