# React SDK MercadoPago
Mercado Pago's Official React SDK.

<br />

# Table of Contents
1. [About](#about)
2. [Prerequisites](#prerequisites)
3. [Run SDK project](#run-sdk-project)
4. [Installation](#installation)
5. [Initializing](#initializing)
6. [Render Brick](#render-brick)
    1. [Example Card Payment Brick](#example-card-paymentbrick)
7. [License](#license)

<br />

## About
This is a wrapper that allows integrate [Checkout Bricks](https://www.mercadopago.com/developers/en/docs/checkout-bricks/landing) easily inside React projects. 

<br />

## Prerequisites
Before starts verify if you have installed Node version `14.18.0` or superior.

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

Execute `npm run start` to initialize storybook

<br/>

## Installation
First, install SDK MercadoPago React:
`npm install @mercadopago/sdk-react`

<br/>

## Initialization
Start the instance of MercadoPago:
```
import initMercadoPago from '@mercadopago/sdk-react/mercadoPago/initMercadoPago';

initMercadoPago('YOUR_PUBLIC_KEY');
```

## Render Brick
Each brick needs a component.

### Example Card Payment Brick
Use CardPayment component inside your functional React:
```
import Card from '../../../src/bricks/cardPayment';

const App = () => {
  return (
    <Card
      initialization={{ amount: 100 }}
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
wip

<br/>

### Example Status Screen Brick
wip

<br/>

### Example Wallet Brick
wip

<br/>

## License
This project is under Apache license, version 2.0. See [Apache 2.0](LICENSE) file for more details.

