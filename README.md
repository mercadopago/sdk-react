# React SDK MercadoPago

Mercado Pago's Official React SDK.

[![NPM Version](https://img.shields.io/npm/v/@mercadopago/sdk-react)](https://www.npmjs.com/package/@mercadopago/sdk-react)
[![Downloads](https://img.shields.io/npm/dt/@mercadopago/sdk-react)](https://www.npmjs.com/package/@mercadopago/sdk-react)

<br />

# Table of Contents

1. [About](#about)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Initialization](#initialization)
5. [Render Brick](#render-brick)
   1. [Example Card Payment Brick](#example-card-payment-brick)
   2. [Example Payment Brick](#example-payment-brick)
   3. [Example Status Screen Brick](#example-status-screen-brick)
   4. [Example Wallet Brick](#example-wallet-brick)
6. [Run SDK project](#run-sdk-project)
7. [License](#license)

<br />

## About

This is a wrapper that allows integrate [Checkout Bricks](https://www.mercadopago.com/developers/en/docs/checkout-bricks/landing) easily inside React projects.

<br />

## Prerequisites

Before starts verify if you have installed Node version `14.18.0` or superior.

<br/>

## Installation

First, install SDK MercadoPago React:
`npm install @mercadopago/sdk-react`

<br/>

## Initialization

Start the instance of MercadoPago:

```jsx
import { initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago('YOUR_PUBLIC_KEY');
```

<br/>

## Render Brick

Each brick needs a component, such as:

### Example Card Payment Brick

Use CardPayment component inside your functional React:

```jsx
import { CardPayment } from '@mercadopago/sdk-react';

const App = () => {
  return (
    <CardPayment
      initialization={{ amount: AMOUNT }}
      onSubmit={async (param) => {
        console.log(param);
      }}
    />
  );
};
export default App;
```

<br/>

### Example Payment Brick

Use Payment component inside your functional React:

```jsx
import { Payment } from '@mercadopago/sdk-react';

const App = () => {
  return (
    <Payment
      initialization={{
        amount: AMOUNT,
        preferenceId: 'YOUR_PREFERENCE_ID',
      }}
      customization={customization}
      onSubmit={async (param) => {
        console.log(param);
      }}
    />
  );
};
export default App;
```

<br/>

### Example Status Screen Brick

Use StatusScreen component inside your functional React:

```jsx
import {StatusScreen} from '@mercadopago/sdk-react';

const App = () => {
  return <StatusScreen initialization={{paymentId: 'YOUR_PAYMENT_ID'}}
};
export default App;
```

<br/>

### Example Wallet Brick

Use Wallet component inside your functional React:

```jsx
import { Wallet } from '@mercadopago/sdk-react';

const App = () => {
  return (
    <Wallet initialization={{ preferenceId: 'YOUR_PREFERENCE_ID' }} customization={customization} />
  );
};
export default App;
```

<br/>

## Run SDK project

To use Mercado Pago React SDK, follow the steps:

Install project:

```
npm i
```

Execute project build:

```
npm build
```

Execute `npm run start` to initialize storybook.

<br/>

## License

This project is under Apache license, version 2.0. See [Apache 2.0](LICENSE) file for more details.
