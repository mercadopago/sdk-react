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
  - [Core Methods](#core-methods)
    - [getIdentificationTypes](#getidentificationtypes)
    - [getPaymentMethods](#getpaymentmethods)
    - [getIssuers](#getissuers)
    - [getInstallments](#getinstallments)
    - [createCardToken](#createcardtoken-1)
  - [Run SDK project](#run-sdk-project)
  - [License](#license)

<br />

## About

This is a wrapper that allows integrate [Checkout Bricks](https://www.mercadopago.com/developers/en/docs/checkout-bricks/landing), [Secure Fields](https://github.com/mercadopago/sdk-js/blob/main/API/fields.md) and [Core Methods](https://github.com/mercadopago/sdk-js/blob/main/API/core-methods.md) easily inside React projects.

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

### Card Number

```jsx
import { CardNumber } from '@mercadopago/sdk-react';

const App = () => {
  return <CardNumber placeholder="Card number" />;
};
export default App;
```

<br/>

### Security Code

```jsx
import { SecurityCode } from '@mercadopago/sdk-react';

const App = () => {
  return <SecurityCode placeholder="Security code" />;
};
export default App;
```

<br/>

### Expiration Date

> Note: Expiration Date cannot coexist with Expiration Month or Expiration Year

```jsx
import { ExpirationDate } from '@mercadopago/sdk-react';

const App = () => {
  return <ExpirationDate placeholder="Expiration date" />;
};
export default App;
```

<br/>

### Expiration Month

```jsx
import { ExpirationMonth } from '@mercadopago/sdk-react';

const App = () => {
  return <ExpirationMonth placeholder="Expiration month" />;
};
export default App;
```

<br/>

### Expiration Year

```jsx
import { ExpirationYear } from '@mercadopago/sdk-react';

const App = () => {
  return <ExpirationYear placeholder="Expiration year" />;
};
export default App;
```

<br/>

### createCardToken

Return a token card

```javascript
import { createCardToken } from '@mercadopago/sdk-react';
const cardToken = await createCardToken({
  cardholderName: '<CARDHOLDER_NAME>',
  identificationType: '<BUYER_IDENTIFICATION_TYPE>',
  identificationNumber: '<BUYER_IDENTIFICATION_NUMBER>',
});
```

<br/>

## Core Methods

For a full explanation of each function parameters and return, check the [SDK-JS documentation of the Core Methods](https://github.com/mercadopago/sdk-js/blob/main/API/core-methods.md)

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

### createCardToken

Return a token card

```javascript
import { createCardToken } from '@mercadopago/sdk-react/coreMethods';
const cardToken = await createCardToken({
  cardNumber: '<CREDIT_CARD_NUMBER>',
  cardholderName: '<CARDHOLDER_NAME>',
  cardExpirationMonth: '<CARD_EXPIRATION_MONTH>',
  cardExpirationYear: '<CARD_EXPIRATION_YEAR>',
  securityCode: '<CARD_SECURITY_CODE>',
  identificationType: '<BUYER_IDENTIFICATION_TYPE>',
  identificationNumber: '<BUYER_IDENTIFICATION_NUMBER>',
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
