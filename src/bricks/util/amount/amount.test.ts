import { TCardPayment } from '../../cardPayment/type';
import { TPaymentType } from '../../payment/type';
import { checkOnlyAmountIsDifferent } from './amount';

describe('Amount - Card Payment Brick', () => {
  test('should return true when only the amount is different between two objects', () => {
    const obj1: TCardPayment = {
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          maxInstallments: 3,
          types: {
            excluded: ['debit_card'],
          },
        },
        visual: {
          style: {
            theme: 'dark',
          },
        },
      },
      initialization: {
        amount: 100,
      },
      onSubmit: async () => {
        return;
      },
    };
    const obj2: TCardPayment = {
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          maxInstallments: 3,
          types: {
            excluded: ['debit_card'],
          },
        },
        visual: {
          style: {
            theme: 'dark',
          },
        },
      },
      initialization: {
        amount: 90,
      },
      onSubmit: async () => {
        return;
      },
    };

    const result = checkOnlyAmountIsDifferent(obj1, obj2);

    expect(result).toBe(true);
  });

  test('should return false when the amount is equal between two objects and other fields are equal', () => {
    const obj1: TCardPayment = {
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          maxInstallments: 3,
          types: {
            excluded: ['debit_card'],
          },
        },
        visual: {
          style: {
            theme: 'dark',
          },
        },
      },
      initialization: {
        amount: 100,
      },
      onSubmit: async () => {
        return;
      },
    };
    const obj2: TCardPayment = {
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          maxInstallments: 3,
          types: {
            excluded: ['debit_card'],
          },
        },
        visual: {
          style: {
            theme: 'dark',
          },
        },
      },
      initialization: {
        amount: 100,
      },
      onSubmit: async () => {
        return;
      },
    };

    const result = checkOnlyAmountIsDifferent(obj1, obj2);

    expect(result).toBe(false);
  });

  test('should return false when the amount is equal between two objects and other fields are different', () => {
    const obj1: TCardPayment = {
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          maxInstallments: 3,
          types: {
            excluded: ['debit_card'],
          },
        },
        visual: {
          style: {
            theme: 'dark',
          },
        },
      },
      initialization: {
        amount: 100,
      },
      onSubmit: async () => {
        return;
      },
    };
    const obj2: TCardPayment = {
      locale: 'en-US',
      customization: {
        paymentMethods: {
          maxInstallments: 6,
          types: {
            excluded: ['credit_card'],
          },
        },
        visual: {
          style: {
            theme: 'bootstrap',
          },
        },
      },
      initialization: {
        amount: 100,
      },
      onSubmit: async () => {
        return;
      },
    };

    const result = checkOnlyAmountIsDifferent(obj1, obj2);

    expect(result).toBe(false);
  });

  test('should return false when the amount and other field(s) are different between two objects', () => {
    const obj1: TCardPayment = {
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          maxInstallments: 3,
          types: {
            excluded: ['debit_card'],
          },
        },
        visual: {
          style: {
            theme: 'dark',
          },
        },
      },
      initialization: {
        amount: 100,
      },
      onSubmit: async () => {
        return;
      },
    };
    const obj2: TCardPayment = {
      locale: 'en-US',
      customization: {
        paymentMethods: {
          maxInstallments: 6,
          types: {
            excluded: ['credit_card'],
          },
        },
        visual: {
          style: {
            theme: 'bootstrap',
          },
        },
      },
      initialization: {
        amount: 90,
      },
      onSubmit: async () => {
        return;
      },
    };

    const result = checkOnlyAmountIsDifferent(obj1, obj2);

    expect(result).toBe(false);
  });
});

describe('Amount - Payment Brick', () => {
  test('should return true when only the amount is different between two objects', () => {
    const obj1: TPaymentType = {
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          maxInstallments: 3,
          creditCard: 'all',
          debitCard: 'all',
        },
        visual: {
          style: {
            theme: 'dark',
          },
        },
      },
      initialization: {
        amount: 100,
      },
      onSubmit: async () => {
        return;
      },
    };
    const obj2: TPaymentType = {
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          maxInstallments: 3,
          creditCard: 'all',
          debitCard: 'all',
        },
        visual: {
          style: {
            theme: 'dark',
          },
        },
      },
      initialization: {
        amount: 90,
      },
      onSubmit: async () => {
        return;
      },
    };

    const result = checkOnlyAmountIsDifferent(obj1, obj2);

    expect(result).toBe(true);
  });

  test('should return false when the amount is equal between two objects and other fields are equal', () => {
    const obj1: TPaymentType = {
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          maxInstallments: 3,
          creditCard: 'all',
          debitCard: 'all',
        },
        visual: {
          style: {
            theme: 'dark',
          },
        },
      },
      initialization: {
        amount: 100,
      },
      onSubmit: async () => {
        return;
      },
    };
    const obj2: TPaymentType = {
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          maxInstallments: 3,
          creditCard: 'all',
          debitCard: 'all',
        },
        visual: {
          style: {
            theme: 'dark',
          },
        },
      },
      initialization: {
        amount: 100,
      },
      onSubmit: async () => {
        return;
      },
    };

    const result = checkOnlyAmountIsDifferent(obj1, obj2);

    expect(result).toBe(false);
  });

  test('should return false when the amount is equal between two objects and other fields are different', () => {
    const obj1: TPaymentType = {
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          maxInstallments: 3,
          creditCard: ['visa', 'master'],
          debitCard: 'all',
        },
        visual: {
          style: {
            theme: 'dark',
          },
        },
      },
      initialization: {
        amount: 100,
      },
      onSubmit: async () => {
        return;
      },
    };
    const obj2: TPaymentType = {
      locale: 'en-US',
      customization: {
        paymentMethods: {
          maxInstallments: 6,
          creditCard: ['visa'],
        },
        visual: {
          style: {
            theme: 'bootstrap',
          },
        },
      },
      initialization: {
        amount: 100,
      },
      onSubmit: async () => {
        return;
      },
    };

    const result = checkOnlyAmountIsDifferent(obj1, obj2);

    expect(result).toBe(false);
  });

  test('should return false when the amount and other field(s) are different between two objects', () => {
    const obj1: TPaymentType = {
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          maxInstallments: 3,
          creditCard: ['visa', 'master'],
          debitCard: 'all',
        },
        visual: {
          style: {
            theme: 'dark',
          },
        },
      },
      initialization: {
        amount: 100,
      },
      onSubmit: async () => {
        return;
      },
    };
    const obj2: TPaymentType = {
      locale: 'en-US',
      customization: {
        paymentMethods: {
          maxInstallments: 6,
          creditCard: ['visa'],
        },
        visual: {
          style: {
            theme: 'bootstrap',
          },
        },
      },
      initialization: {
        amount: 90,
      },
      onSubmit: async () => {
        return;
      },
    };

    const result = checkOnlyAmountIsDifferent(obj1, obj2);

    expect(result).toBe(false);
  });
});
