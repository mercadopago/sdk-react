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
6. [Core methods](#core-methods)
7. [getIdentificationTypes](#getIdentificationTypes)
8. [getPaymentMethods](#getPaymentMethods)
9. [getIssuers](#getIssuers)
10. [getInstallments](#getInstallments)
11. [createCardToken](#createCardToken)
12. [Run SDK project](#run-sdk-project)
13. [License](#license)

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

## Secure Fields

Secure Fields are input components that allow you to collect credit and debit card information safely.
The Secure Fields module also provides a method to get the card token safely without the need to store the card data.

### createCardToken

Return a token card

```javascript
import { createCardToken } from '@mercadopago/sdk-react';
const cardToken = await createCardToken({
  cardholderName: 'APRO',
  identificationType: 'CPF',
  identificationNumber: '12345678912',
});
```

<br/>
### CardNumber

```jsx
import { CardNumber } from '@mercadopago/sdk-react';

const App = () => {
  return <CardNumber />;
};
export default App;
```

<br/>

### SecurityCode

```jsx
import { SecurityCode } from '@mercadopago/sdk-react';

const App = () => {
  return <SecurityCode />;
};
export default App;
```

<br/>

### ExpirationDate

```jsx
import { ExpirationDate } from '@mercadopago/sdk-react';

const App = () => {
  return <ExpirationDate />;
};
export default App;
```

<br/>

### ExpirationMonth

```jsx
import { ExpirationMonth } from '@mercadopago/sdk-react';

const App = () => {
  return <ExpirationMonth />;
};
export default App;
```

<br/>

### ExpirationYear

```jsx
import { ExpirationYear } from '@mercadopago/sdk-react';

const App = () => {
  return <ExpirationYear />;
};
export default App;
```

<br/>

## Core Methods

For a full explanation of each function parameters and return, check the [SDK-JS documentation of the Core Methods](https://github.com/mercadopago/sdk-js/blob/main/API/core-methods.md)

### getIdentificationTypes

Return all the document types based on the `public_key`

```javascript
import { getIdentificationTypes } from '@mercadopago/sdk-react';
const identificationTypes = await getIdentificationTypes();
```

### getPaymentMethods

Returns a payment methods list

```javascript
import { getPaymentMethods } from '@mercadopago/sdk-react';
const paymentMethods = await getPaymentMethods({ bin: '41111111' });
```

### getIssuers

Returns a issuers list

```javascript
import { getIssuers } from '@mercadopago/sdk-react';
const issuers = await getIssuers({ paymentMethodId: 'visa', bin: '411111111' });
```

### getInstallments

Returns all installments available

```javascript
import { getInstallments } from '@mercadopago/sdk-react';
const installments = await getInstallments({
  amount: '1000',
  locale: 'pt-BR',
  bin: '41111111',
  processingMode: 'aggregator',
});
```

### createCardToken

Return a token card

```javascript
import { createCardToken } from '@mercadopago/sdk-react/coreMethods';
const cardToken = await createCardToken({
  cardNumber: '<CREDIT_CARD_NUMBER>',
  cardholderName: 'APRO',
  cardExpirationMonth: '11',
  cardExpirationYear: '2025',
  securityCode: '123',
  identificationType: 'CPF',
  identificationNumber: '12345678912',
});
```

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
