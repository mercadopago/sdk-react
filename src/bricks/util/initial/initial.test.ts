import { onErrorDefault, onSubmitDefault, onReadyDefault } from './index';

describe('Test default functions', () => {
  test('Console error should have been called when onErrorDefault is call', () => {
    // Mock the console.error to not generate a console.error when we run test.
    const logSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
    onErrorDefault({
      type: 'critical',
      cause: 'settings_empty',
      message: '[Initialization error] Settings object is empty, please pass required properties',
    });

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);

    logSpy.mockRestore();
  });
  test('Should onSubmitDefault be called', () => {
    expect(onSubmitDefault()).resolves.toBe({});
  });
  test('Should onReadyDefault be called', () => {
    expect(onReadyDefault()).toBe(undefined);
  });
});
