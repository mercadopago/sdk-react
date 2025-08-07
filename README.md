# React SDK MercadoPago

Mercado Pago's Official React SDK.

[![NPM Version](https://img.shields.io/npm/v/@mercadopago/sdk-react)](https://www.npmjs.com/package/@mercadopago/sdk-react)
[![Downloads](https://img.shields.io/npm/dt/@mercadopago/sdk-react)](https://www.npmjs.com/package/@mercadopago/sdk-react)

<br />

# Table of Contents

- [React SDK MercadoPago](#react-sdk-mercadopago)
- [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Initialization](#initialization)
  - [Checkout Bricks](#checkout-bricks)
    - [Card Payment Brick](#card-payment-brick)
    - [Payment Brick](#payment-brick)
    - [Status Screen Brick](#status-screen-brick)
    - [Wallet Brick](#wallet-brick)
    - [Brand Brick](#brand-brick)
  - [Secure Fields](#secure-fields)
    - [Card Number](#card-number)
    - [Security Code](#security-code)
    - [Expiration Date](#expiration-date)
    - [Expiration Month](#expiration-month)
    - [Expiration Year](#expiration-year)
    - [createCardToken](#createcardtoken)
    - [updateCardToken](#updatecardtoken)
  - [Fast Payment](#fast-payment)
    - [createAuthenticator](#createauthenticator)
  - [Core Methods](#core-methods)
    - [getIdentificationTypes](#getidentificationtypes)
    - [getPaymentMethods](#getpaymentmethods)
    - [getAccountPaymentMethods](#getaccountpaymentmethods)
    - [getCardId](#getcardid)
    - [updatePseudotoken](#updatepseudotoken)
    - [getIssuers](#getissuers)
    - [getInstallments](#getinstallments)
  - [Run SDK project](#run-sdk-project)
  - [License](#license)

<br />

## About

This is a wrapper that allows integrate [Checkout Bricks](https://www.mercadopago.com/developers/en/docs/checkout-bricks/landing), [Secure Fields](https://github.com/mercadopago/sdk-js/blob/main/docs/fields.md) and [Core Methods](https://github.com/mercadopago/sdk-js/blob/main/docs/core-methods.md), and **Fast Payment authentication** easily inside React projects.

<br />

## Prerequisites

Before starts verify if you have installed Node version `v16.20.2` or superior.

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

## Checkout Bricks

Checkout Bricks are modular checkout components.
Below are examples of Brick implementations, for more information check the Examples folder.

> **Note**
> It's mandatory to have previously done the [Initialization step](#initialization)

### Card Payment Brick

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

### Payment Brick

Use Payment component inside your functional React:

```jsx
import { Payment } from '@mercadopago/sdk-react';

const App = () => {
  return (
    <Payment
      initialization={{
        amount: AMOUNT,
        preferenceId: '<YOUR_PREFERENCE_ID>',
      }}
      onSubmit={async (param) => {
        console.log(param);
      }}
    />
  );
};
export default App;
```

<br/>

### Status Screen Brick

Use StatusScreen component inside your functional React:

```jsx
import { StatusScreen } from '@mercadopago/sdk-react';

const App = () => {
  return <StatusScreen initialization={{ paymentId: 'YOUR_PAYMENT_ID' }} />;
};
export default App;
```

<br/>

### Wallet Brick

Use Wallet component inside your functional React:

```jsx
import { Wallet } from '@mercadopago/sdk-react';

const App = () => {
  return <Wallet initialization={{ preferenceId: 'YOUR_PREFERENCE_ID' }} />;
};
export default App;
```

<br/>

### Brand Brick

Use Brand component inside your functional React:

```jsx
import { Brand } from '@mercadopago/sdk-react';

const App = () => {
  return <Brand />;
};
export default App;
```

<br/>

## Secure Fields

Secure Fields are input components that allow you to collect credit and debit card information safely, and allow you to get the PCI SAQ A certification.
The Secure Fields module also provides a method to get the card token safely without the need to store the card data.

> **Note**
> It's mandatory to have previously done the [Initialization step](#initialization)

## Fast Payment

> This feature is disabled by default, to enable, please contact the offical _Mercado Pago_ support via developer's website: www.mercadopago.com/developers

Fast Payment allows users to authenticate using their MercadoPago/MercadoLibre account and quickly access their saved payment methods for streamlined checkout experiences.

> **Note**
> It's mandatory to have previously done the [Initialization step](#initialization)

### createAuthenticator

Creates an authenticator instance for Fast Payments authentication flow.

```javascript
import { createAuthenticator } from '@mercadopago/sdk-react';

// Show authentication UI and get FastPaymentToken
try {
  const authenticator = await createAuthenticator('100.00', 'user@example.com');
  const fastPaymentToken = await authenticator.show({
    confirmationLocation: 'web',
  });
  console.log('FastPaymentToken:', fastPaymentToken);
} catch (error) {
  console.error(error.message, 'Error code:', error?.errorCode);
}
```

For a complete working example, see the `examples/fastPaymentFlow/` directory.

<br/>

### Components

#### Card Number

```jsx
import { CardNumber } from '@mercadopago/sdk-react';

const App = () => {
  return <CardNumber placeholder="Card number" />;
};
export default App;
```

<br/>

#### Security Code

```jsx
import { SecurityCode } from '@mercadopago/sdk-react';

const App = () => {
  return <SecurityCode placeholder="Security code" />;
};
export default App;
```

<br/>

#### Expiration Date

> Note: Expiration Date cannot coexist with Expiration Month or Expiration Year

```jsx
import { ExpirationDate } from '@mercadopago/sdk-react';

const App = () => {
  return <ExpirationDate placeholder="Expiration date" />;
};
export default App;
```

<br/>

#### Expiration Month

```jsx
import { ExpirationMonth } from '@mercadopago/sdk-react';

const App = () => {
  return <ExpirationMonth placeholder="Expiration month" />;
};
export default App;
```

<br/>

#### Expiration Year

```jsx
import { ExpirationYear } from '@mercadopago/sdk-react';

const App = () => {
  return <ExpirationYear placeholder="Expiration year" />;
};
export default App;
```

<br/>

### Methods

#### createCardToken

Return a token card

```javascript
import { createCardToken } from '@mercadopago/sdk-react';
const cardToken = await createCardToken({
  cardholderName: '<CARDHOLDER_NAME>',
  identificationType: '<BUYER_IDENTIFICATION_TYPE>',
  identificationNumber: '<BUYER_IDENTIFICATION_NUMBER>',
});
```

#### updateCardToken

Update a token card

```javascript
import { updateCardToken } from '@mercadopago/sdk-react';
const cardToken = await updateCardToken('<OLD_CARD_TOKEN>');
```

## Core Methods

For a full explanation of each function parameters and return, check the [SDK-JS documentation of the Core Methods](https://github.com/mercadopago/sdk-js/blob/main/docs/core-methods.md)

> **Note**
> It's mandatory to have previously done the [Initialization step](#initialization)

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
const paymentMethods = await getPaymentMethods({ bin: '<CARD_BIN>' });
```

### getAccountPaymentMethods

Returns account payment methods for authenticated users using FastPaymentToken

```javascript
import { getAccountPaymentMethods } from '@mercadopago/sdk-react';
const accountPaymentMethods = await getAccountPaymentMethods('<FAST_PAYMENT_TOKEN>');
```

### getCardId

Retrieves card ID from a pseudotoken using FastPaymentToken authentication

```javascript
import { getCardId } from '@mercadopago/sdk-react';
const cardIdResponse = await getCardId('<FAST_PAYMENT_TOKEN>', '<PSEUDOTOKEN>');
console.log(cardIdResponse.card_id);
```

### updatePseudotoken

Updates a pseudotoken with card token information

```javascript
import { updatePseudotoken } from '@mercadopago/sdk-react';
await updatePseudotoken('<FAST_PAYMENT_TOKEN>', '<PSEUDOTOKEN>', '<CARD_TOKEN>');
```

### getIssuers

Returns a issuers list

```javascript
import { getIssuers } from '@mercadopago/sdk-react';
const issuers = await getIssuers({
  paymentMethodId: '<CARD_PAYMENT_METHOD_ID>',
  bin: '<CARD_BIN>',
});
```

### getInstallments

Returns all installments available

```javascript
import { getInstallments } from '@mercadopago/sdk-react';
const installments = await getInstallments({
  amount: <AMOUNT>,
  locale: '<LOCALE>',
  bin: '<CARD_BIN>',
});
```

> By default, your bundler should select the appropriate module format. However, if you need to explicitly use ECMAScript Modules (ESM) or CommonJS (CJS), you can specify. For example, use `import createCardToken from '@mercadopago/sdk-react/esm/secureFields/createCardToken/index';` for ECMAScript modules, or `const createCardToken = require('@mercadopago/sdk-react/cjs/secureFields/createCardToken/index');` for CommonJS modules.

## Run SDK project

> Replace the `<YOUR_PUBLIC_KEY>` on `examples/contants` with your public key.

To run Mercado Pago React SDK, follow the steps:

Install project dependencies:

```
npm install
```

Execute project build (_optional_):

```
npm run build
```

Execute storybook:

```
npm run start
```

<br/>

## License

This project is under Apache license, version 2.0. See [Apache 2.0](LICENSE) file for more details.
