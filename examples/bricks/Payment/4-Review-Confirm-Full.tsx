import React from 'react';
import { initMercadoPago, Payment } from '../../../src/index';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY, { locale: 'es-MX' });

// This feature is temporarily exclusive for MLM (México) 🇲🇽 and MLA (Argentina) 🇦🇷
const App = () => {
  const initialization = {
    amount: 76.98, // result of = totalItemsAmount + costs (shipping) - totalDiscountsAmount
    items: {
      totalItemsAmount: 81.98, //sum of all items in the list = (5 x 10.00) + (1 x 15.99) + (1 x 15.99)
      itemsList: [
        {
          units: 5,
          value: 10,
          name: 'Product A',
          description: 'A description',
          imageURL:
            'https://http2.mlstatic.com/frontend-assets/mp-acq-home-landing/logo-mercadopago.jpg',
        },
        {
          units: 1,
          value: 15.99,
          name: 'Product B',
          description: 'B description',
          imageURL: '<IMAGE_URL>',
        },
        {
          units: 1,
          value: 15.99,
          name: 'Product C',
        },
      ],
    },
    billing: {
      firstName: '<FIRST_NAME>',
      lastName: '<LAST_NAME>',
      taxRegime: '<TAX_REGIME>',
      taxIdentificationNumber: '<TAX_IDENTIFICATION_NUMBER>',
      identification: {
        type: '<TYPE>',
        number: '<NUMBER>',
      },
      billingAddress: {
        streetName: '<STREET_NAME>',
        streetNumber: '<STREET_NUMBER>',
        neighborhood: '<NEIGHBORHOOD>',
        city: '<CITY>',
        federalUnit: '<FEDERAL_UNIT>',
        zipCode: '<ZIP_CODE>',
      },
    },
    shipping: {
      costs: 10,
      shippingMode: 'Express',
      description: '1 day',
      receiverAddress: {
        streetName: '<STREET_NAME>',
        streetNumber: '<STREET_NUMBER>',
        neighborhood: '<NEIGHBORHOOD>',
        city: '<CITY>',
        federalUnit: '<FEDERAL_UNIT>',
        zipCode: '<ZIP_CODE>',
        additionalInformation: '<ADDITIONAL_INFORMATION>',
      },
    },
    discounts: {
      totalDiscountsAmount: 15, //sum of all discounts in the list = 10 + 5
      discountsList: [
        {
          name: 'BLACKFRIDAY15',
          value: 10,
        },
        {
          name: 'WELCOME5',
          value: 5,
        },
      ],
    },
    payer: {
      email: '<EMAIL>',
    },
  };

  const onSubmit = async () => console.log('Calling onSubmit');

  const onClickEditShippingData = () => console.log('Calling onClickEditShippingData...');

  const onClickEditBillingData = () => console.log('Calling onClicktEditBillingData...');

  const onRenderNextStep = (currentStep: string) =>
    console.log('Calling onRenderNextStep...', currentStep);

  const onRenderPreviousStep = (currentStep: string) =>
    console.log('Calling onRenderPreviousStep...', currentStep);

  return (
    <Payment
      initialization={initialization}
      customization={{
        enableReviewStep: true,
        reviewCardsOrder: ['payment_method', 'shipping', 'billing'],
        paymentMethods: {
          atm: 'all',
          ticket: 'all',
          bankTransfer: 'all',
          debitCard: 'all',
          prepaidCard: 'all',
          creditCard: 'all',
          mercadoPago: 'all',
        },
      }}
      onSubmit={onSubmit}
      onClickEditShippingData={onClickEditShippingData}
      onClickEditBillingData={onClickEditBillingData}
      onRenderNextStep={onRenderNextStep}
      onRenderPreviousStep={onRenderPreviousStep}
    />
  );
};

export default App;
