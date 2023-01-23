const SDK_MERCADOPAGO_URL = 'https://sdk.mercadopago.com/js/v2';
const SDK_MERCADOPAGO_URL_REGEX = /^https:\/\/sdk\.mercadopago\.com\/js\/v2\/?(\?.*)?$/;
const EXISTING_SCRIPT_MESSAGE =
  'MercadoPago has already been initialized in your window, please remove the duplicate import';

const findScript = () => {
  var scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll(
    'script[src^="'.concat(SDK_MERCADOPAGO_URL, '"]'),
  );

  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];

    if (!SDK_MERCADOPAGO_URL_REGEX.test(script.src)) {
      continue;
    }

    return script;
  }

  return null;
};

const injectScript = () => {
  var script = document.createElement('script');
  script.src = SDK_MERCADOPAGO_URL;
  var headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error(
      'Expected document.body or document.head not to be null. MercadoPago requires a <body> or a <head> element, please add on your project.',
    );
  }

  headOrBody.appendChild(script);
  return script;
};

let LoadPromise: null | Promise<unknown> = null;
const loadMercadoPago = () => {
  // Ensure that we only attempt to load Stripe.js at most once
  if (LoadPromise !== null) {
    return LoadPromise;
  }

  LoadPromise = new Promise(function (resolve, reject) {
    if (typeof window === 'undefined') {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }

    if (window.MercadoPago) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
      resolve('MercadoPago.js ready!');
      return;
    }

    try {
      var script = findScript();

      if (script) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript();
      }

      script.addEventListener('load', function () {
        if (window.MercadoPago) {
          resolve('MercadoPago.js ready!');
        } else {
          reject(new Error('MercadoPago.js not available'));
        }
      });
      script.addEventListener('error', function () {
        reject(new Error('Failed to load MercadoPago.js'));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });
  return LoadPromise;
};

export { loadMercadoPago };
