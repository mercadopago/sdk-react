import React, { useState, useEffect } from 'react';
import {
  initMercadoPago,
  createAuthenticator,
  getAccountPaymentMethods,
  getCardId,
  updatePseudotoken,
  SecurityCode,
  createCardToken,
} from '../../src/index';
import { AccountPaymentMethodsResponseData } from '../../src/coreMethods/getAccountPaymentMethods/types';
import { IAuthenticator } from '../../src/authenticator';
import { PUBLIC_KEY } from '../constants';

interface FastPaymentState {
  email: string;
  amount: string;
  authenticator: IAuthenticator | null;
  fastPaymentToken: string | null;
  paymentMethods: AccountPaymentMethodsResponseData[];
  selectedPaymentMethod: string;
  securityCodeMounted: boolean;
  transactionReady: boolean;
  loading: boolean;
  error: string | null;
}

const FastPaymentExample: React.FC = () => {
  const [state, setState] = useState<FastPaymentState>({
    email: 'test_user_82578115@testuser.com',
    amount: '100.00',
    authenticator: null,
    fastPaymentToken: null,
    paymentMethods: [],
    selectedPaymentMethod: '',
    securityCodeMounted: false,
    transactionReady: false,
    loading: false,
    error: null,
  });
  useEffect(() => {
    initMercadoPago(PUBLIC_KEY);
  }, []);

  useEffect(() => {
    if (state.email && state.amount) {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      createAuthenticator(state.amount, state.email)
        .then((authenticator) => {
          setState((prev) => ({
            ...prev,
            authenticator,
            loading: false,
          }));
          console.log('Authenticator ready...');
        })
        .catch((error) => {
          setState((prev) => ({
            ...prev,
            loading: false,
            error,
          }));
        });
    }
  }, [state.email, state.amount, state.authenticator]);

  const handleAuthenticate = async () => {
    if (!state.authenticator) {
      setState((prev) => ({ ...prev, error: 'Authenticator not ready' }));
      return;
    }

    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const fastPaymentToken = await state.authenticator.show();

      if (fastPaymentToken) {
        setState((prev) => ({
          ...prev,
          fastPaymentToken,
          loading: false,
        }));
        console.log('FastPaymentToken obtained:', fastPaymentToken);
      } else {
        throw new Error('Authentication cancelled or failed');
      }
    } catch (error: any) {
      const errorMessage = error.message || error.toString();
      setState((prev) => ({
        ...prev,
        loading: false,
        error: `Authentication error: ${errorMessage}`,
      }));
      console.error('Authentication error:', error);
    }
  };

  const handleGetPaymentMethods = async () => {
    if (!state.fastPaymentToken) {
      setState((prev) => ({ ...prev, error: 'FastPaymentToken required' }));
      return;
    }

    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response = await getAccountPaymentMethods(state.fastPaymentToken);

      if (response?.data) {
        setState((prev) => ({
          ...prev,
          paymentMethods: response.data,
          loading: false,
        }));
        console.log('Payment methods:', response.data);
      } else {
        throw new Error('No data returned');
      }
    } catch (error: any) {
      const errorMessage = error.message || error.toString();
      setState((prev) => ({
        ...prev,
        loading: false,
        error: `Error getting payment methods: ${errorMessage}`,
      }));
      console.error('Payment methods error:', error);
    }
  };

  const handlePaymentMethodSelect = (token: string) => {
    setState((prev) => ({
      ...prev,
      selectedPaymentMethod: token,
      securityCodeMounted: false,
    }));

    const selectedMethod = state.paymentMethods.find((method) => method.token === token);
    if (
      selectedMethod &&
      selectedMethod.type !== 'account_money' &&
      selectedMethod.security_code_settings.mode === 'madatory'
    ) {
      setState((prev) => ({ ...prev, securityCodeMounted: true }));
    }
  };

  const handleSubmitPayment = async () => {
    if (!state.fastPaymentToken || !state.selectedPaymentMethod) {
      setState((prev) => ({ ...prev, error: 'FastPaymentToken and payment method required' }));
      return;
    }

    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // Get card ID from pseudotoken
      if (state.securityCodeMounted) {
        const cardIdResponse = await getCardId(state.fastPaymentToken, state.selectedPaymentMethod);

        if (!cardIdResponse?.card_id) {
          throw new Error('Failed to get card ID');
        }

        // Create card token using the secure fields API
        const cardTokenResponse = await createCardToken({
          cardId: cardIdResponse.card_id,
        });

        if (!cardTokenResponse?.id) {
          throw new Error('Failed to create card token');
        }

        // Update pseudotoken with the card token
        await updatePseudotoken(
          state.fastPaymentToken,
          state.selectedPaymentMethod,
          cardTokenResponse.id,
        );

        setState((prev) => ({
          ...prev,
          loading: false,
        }));

        // Set transaction ready status after successful token creation
        setState((prev) => ({
          ...prev,
          transactionReady: true,
        }));

        console.log('✅ Transaction data ready!');
      }
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: `Error creating token: ${error.message || error}`,
      }));
      console.error('Token creation error:', error);
    }
  };

  const updateState = (field: keyof FastPaymentState, value: any) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const getPaymentMethodDisplayName = (method: AccountPaymentMethodsResponseData): string => {
    if (method.type === 'account_money') {
      return method.name;
    }

    const lastFourDigits = 'card' in method ? method.card?.card_number.last_four_digits : '';
    return `${method.issuer.name} ending in ${lastFourDigits}`;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Fast Payment Flow Example</h1>
      <p>Complete Fast Payments authentication and payment flow</p>
      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '5px',
        }}
      >
        <h3>Configuration</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label>
          <input
            type="email"
            value={state.email}
            onChange={(e) => updateState('email', e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Amount: </label>
          <input
            type="number"
            value={state.amount}
            onChange={(e) => updateState('amount', e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <p>
          Status:{' '}
          {state.authenticator
            ? '✅ Authenticator ready'
            : state.error
            ? `❌ Error: ${state.error}`
            : '⏳ Preparing authenticator...'}
        </p>
      </div>

      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '5px',
        }}
      >
        <h3>Authenticate & Get FastPaymentToken</h3>
        <button
          onClick={handleAuthenticate}
          disabled={!state.authenticator || state.loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#009ee3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: state.authenticator && !state.loading ? 'pointer' : 'not-allowed',
          }}
        >
          {state.loading ? 'Authenticating...' : 'Authenticate'}
        </button>
        {state.fastPaymentToken && (
          <div style={{ marginTop: '10px' }}>
            <label>FastPaymentToken: </label>
            <textarea
              value={state.fastPaymentToken}
              readOnly
              style={{
                width: '100%',
                height: '80px',
                padding: '5px',
                backgroundColor: '#f0f0f0',
                fontSize: '12px',
                fontFamily: 'monospace',
              }}
            />
          </div>
        )}
      </div>

      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '5px',
        }}
      >
        <h3>Get Payment Methods</h3>
        <button
          onClick={handleGetPaymentMethods}
          disabled={!state.fastPaymentToken || state.loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#00a650',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: state.fastPaymentToken && !state.loading ? 'pointer' : 'not-allowed',
          }}
        >
          {state.loading ? 'Loading...' : 'Get Payment Methods'}
        </button>

        {state.paymentMethods.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <label>Select Payment Method: </label>
            <select
              value={state.selectedPaymentMethod}
              onChange={(e) => handlePaymentMethodSelect(e.target.value)}
              style={{ width: '100%', padding: '5px' }}
            >
              <option value="">Select a payment method</option>
              {state.paymentMethods.map((method) => (
                <option key={method.token} value={method.token}>
                  {getPaymentMethodDisplayName(method)} ({method.type})
                </option>
              ))}
            </select>

            <details style={{ marginTop: '10px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Payment Methods Details ({state.paymentMethods.length} found)
              </summary>
              <pre
                style={{
                  backgroundColor: '#f8f9fa',
                  padding: '10px',
                  borderRadius: '3px',
                  fontSize: '11px',
                  overflow: 'auto',
                  maxHeight: '200px',
                }}
              >
                {JSON.stringify(state.paymentMethods, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>

      {state.selectedPaymentMethod && (
        <div
          style={{
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '5px',
          }}
        >
          <h3>Security Code & Create Token</h3>

          {(() => {
            const selectedMethod = state.paymentMethods.find(
              (m) => m.token === state.selectedPaymentMethod,
            );
            return selectedMethod ? (
              <div
                style={{
                  marginBottom: '10px',
                  padding: '10px',
                  backgroundColor: '#e7f3ff',
                  borderRadius: '5px',
                }}
              >
                <strong>Selected:</strong> {getPaymentMethodDisplayName(selectedMethod)}
                <br />
                <strong>Type:</strong> {selectedMethod.type}
                <br />
                <strong>Token:</strong> {selectedMethod.token}
              </div>
            ) : null;
          })()}

          {state.securityCodeMounted && (
            <div style={{ marginBottom: '10px' }}>
              <label>Security Code (CVV): </label>
              <div
                id="securityCode-container"
                style={{
                  border: '1px solid #ddd',
                  padding: '10px',
                  borderRadius: '3px',
                  backgroundColor: 'white',
                  minHeight: '40px',
                }}
              >
                <SecurityCode placeholder="CVV" />
              </div>
            </div>
          )}

          <button
            onClick={handleSubmitPayment}
            disabled={!state.selectedPaymentMethod || state.loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f7931e',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: state.selectedPaymentMethod && !state.loading ? 'pointer' : 'not-allowed',
            }}
          >
            {state.loading ? 'Creating Token...' : 'Submit Payment'}
          </button>

          {/* Transaction Ready Status */}
          {state.transactionReady && (
            <div
              style={{
                marginTop: '15px',
                padding: '15px',
                backgroundColor: '#d4edda',
                borderColor: '#c3e6cb',
                borderRadius: '5px',
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px', marginRight: '8px' }}>✅</span>
                <strong style={{ color: '#155724' }}>Transaction Ready!</strong>
              </div>
              <p style={{ margin: '0', color: '#155724', fontSize: '14px' }}>
                Payment data has been successfully prepared.
              </p>
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#6c757d' }}>
                <strong>Next steps:</strong> Use this prepared data with your payment processing API
                to complete the transaction.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Display */}
      {state.authenticator && state.error && (
        <div
          style={{
            padding: '10px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '5px',
            marginBottom: '20px',
          }}
        >
          <strong>Error:</strong> {state.error}
        </div>
      )}

      {/* Debug Information */}
      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '5px',
        }}
      >
        <h3>Debug Information</h3>
        <pre
          style={{
            backgroundColor: '#f8f9fa',
            padding: '10px',
            borderRadius: '3px',
            fontSize: '12px',
            overflow: 'auto',
          }}
        >
          {JSON.stringify(
            {
              hasAuthenticator: !!state.authenticator,
              hasFastPaymentToken: !!state.fastPaymentToken,
              paymentMethodsCount: state.paymentMethods.length,
              selectedMethod: state.selectedPaymentMethod,
              transactionReady: state.transactionReady,
              loading: state.loading,
              authenticatorApplication: state.authenticator?.getApplication() || null,
            },
            null,
            2,
          )}
        </pre>
      </div>
    </div>
  );
};

export default FastPaymentExample;
