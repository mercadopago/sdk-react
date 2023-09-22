import React from 'react';
import Payment from '../../../src/bricks/payment';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago('TEST-d198443d-7e9f-4e5f-a770-e5b23ae627cb', { locale: 'es-MX' });

const App = () => {
  const initialization = {
    amount: 100,
    preferenceId: '1283129650-38f60f5f-08b3-48d3-928b-43689cd41240',
    items: {
      totalItemsAmount: 600.55,
      itemsList: [
        {
          units: 5,
          value: 100,
          name: 'Product A',
          description: 'A description',
          imageURL: 'http://www.mercadolivre.com',
        },
        {
          units: 2,
          value: 50,
          name: 'Product B',
          description: 'B description',
          imageURL: 'http://www.mercadolivre.com',
        },
        {
          units: 2,
          value: 50,
          name: 'Product B',
          description: 'B description',
          imageURL: 'http://www.mercadolivre.com',
        },
        {
          units: 4,
          value: 50,
          name: 'Product D',
          description: 'D description',
          imageURL: 'http://www.mercadolivre.com',
        },
        {
          units: 5,
          value: 50,
          name: 'Product E',
          description: 'E description',
          imageURL: 'http://www.mercadolivre.com',
        },
        {
          units: 6,
          value: 50,
          name: 'Product F',
          description: 'F description',
          imageURL: 'http://www.mercadolivre.com',
        },
      ],
    },
    billing: {
      firstName: 'Ana',
      lastName: 'Silva',
      taxRegime: 'Simples Nacional',
      taxIdentificationNumber: '12312311123',
      billingAddress: {
        streetName: 'Rua Teste',
        streetNumber: '123',
        neighborhood: 'Bairro das Laranjeiras',
        city: 'Campina Grande',
        federalUnit: 'SP',
        zipCode: '00000-000',
        complement: 'Ap 1111',
      },
    },
    shipping: {
      costs: 0,
      shippingMode: 'Express',
      description: 'Chegará em 1 dia útil',
      receiverAddress: {
        streetName: 'Rua Teste',
        streetNumber: '123',
        neighborhood: 'Bairro das Laranjeiras',
        city: 'Campina Grande',
        federalUnit: 'SP',
        zipCode: '00000-000',
      },
    },
    discounts: {
      totalDiscountsAmount: 30,
      discountsList: [
        {
          name: 'BLACKFRIDAY10',
          value: 10,
        },
        {
          name: 'WELCOME20',
          value: 20,
        },
      ],
    },
    payer: {
      email: 'anasilva@test.com',
    },
  };

  const customization = {
    enableReviewStep: true,
    reviewCardsOrder: ['payment_method', 'shipping', 'billing'],
    paymentMethods: {
      atm: 'all',
      bankTransfer: ['pix'],
      creditCard: 'all',
      debitCard: 'all',
      mercadoPago: 'all',
    },
    hideValuePropsFrom: [],
  };

  const onSubmit = async () => console.log('Calling onSubmit');

  const onClickEditShippingData = () => console.log('Calling onClickEditShippingData...');

  const onClickEditBillingData = () => console.log('Calling onClicktEditBillingData...');

  const onRenderNextStep = () => console.log('Calling onRenderNextStep...');

  const onRenderPreviousStep = () => console.log('Calling onRenderNextStep...');

  return (
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={onSubmit}
      onClickEditShippingData={onClickEditShippingData}
      onClickEditBillingData={onClickEditBillingData}
      onRenderNextStep={onRenderNextStep}
      onRenderPreviousStep={onRenderPreviousStep}
    />
  );
};

export default App;
