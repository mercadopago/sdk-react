import path from 'path';
import ts from 'typescript';

// Compile consumers against the actual public entry point, including JSX props.
const root = path.resolve(__dirname, '../../..');
const preamble = `import React from 'react';
import { Wallet, TWallet, WalletOrderCredentials, PreferenceOnInitialization, PreferenceOnSubmit } from '../../index';
declare const pair: WalletOrderCredentials;
`;

const positives = [
  ['initialized-order', 'const props: TWallet = { initialization: pair };'],
  ['callback-only-order', 'const props: TWallet = { onSubmit: async () => pair };'],
  [
    'initialized-order-with-callback',
    'const props: TWallet = { initialization: pair, onSubmit: async () => pair };',
  ],
  [
    'legacy-initialized-preference',
    "const props: PreferenceOnInitialization = { initialization: { preferenceId: 'SYNTHETIC_PREFERENCE' } };",
  ],
  [
    'legacy-callback-preference',
    "const props: PreferenceOnSubmit = { initialization: { redirectMode: 'self' }, onSubmit: async () => 'SYNTHETIC_PREFERENCE' };",
  ],
  [
    'initialized-preference-with-callback',
    "const props: TWallet = { initialization: { preferenceId: 'SYNTHETIC_PREFERENCE' }, onSubmit: async () => pair };",
  ],
  [
    'callback-null-fallback',
    'const props: TWallet = { initialization: pair, onSubmit: async () => null };',
  ],
  [
    'callback-undefined-fallback',
    'const props: TWallet = { initialization: pair, onSubmit: async () => undefined };',
  ],
  [
    'callback-void-fallback',
    'const props: TWallet = { initialization: pair, onSubmit: async () => {} };',
  ],
  ['modal-mode', "const props: TWallet = { initialization: { ...pair, redirectMode: 'modal' } };"],
  ['blank-mode', "const props: TWallet = { initialization: { ...pair, redirectMode: 'blank' } };"],
];
const negatives = [
  [
    'missing-client-token',
    "const props: TWallet = { initialization: { orderId: 'SYNTHETIC_ORDER' } };",
  ],
  [
    'missing-order-id',
    "const props: TWallet = { initialization: { clientToken: 'SYNTHETIC_TOKEN' } };",
  ],
  [
    'partial-with-callback',
    "const props: TWallet = { initialization: { orderId: 'SYNTHETIC_ORDER' }, onSubmit: async () => pair };",
  ],
  [
    'conflicting-initialization',
    "const props: TWallet = { initialization: { ...pair, preferenceId: 'SYNTHETIC_PREFERENCE' } };",
  ],
  [
    'caller-url-initialization',
    "const props: TWallet = { initialization: { checkoutUrl: 'https://synthetic.invalid' }, onSubmit: async () => pair };",
  ],
  [
    'caller-url-top-level',
    "const props: TWallet = { initialization: pair, checkoutUrl: 'https://synthetic.invalid' };",
  ],
  [
    'partial-callback-order',
    "const props: TWallet = { onSubmit: async () => ({ orderId: 'SYNTHETIC_ORDER' }) };",
  ],
  [
    'partial-callback-token',
    "const props: TWallet = { onSubmit: async () => ({ clientToken: 'SYNTHETIC_TOKEN' }) };",
  ],
  [
    'conflicting-callback',
    "const props: TWallet = { onSubmit: async () => ({ ...pair, preferenceId: 'SYNTHETIC_PREFERENCE' }) };",
  ],
  [
    'caller-url-callback',
    "const props: TWallet = { onSubmit: async () => ({ ...pair, checkoutUrl: 'https://synthetic.invalid' }) };",
  ],
  [
    'unknown-callback',
    'declare const submit: () => Promise<unknown>; const props: TWallet = { onSubmit: submit };',
  ],
  ['number-callback', 'const props: TWallet = { onSubmit: async () => 42 };'],
  ['empty-object-callback', 'const props: TWallet = { onSubmit: async () => ({}) };'],
  ['missing-source', 'const props: TWallet = {};'],
  ['flat-order-pair', 'const props: TWallet = { ...pair };'],
  [
    'variable-conflicting-source',
    "const mixed = { ...pair, preferenceId: 'SYNTHETIC_PREFERENCE' }; const props: TWallet = { initialization: mixed };",
  ],
  [
    'undefined-half-pair',
    "const props: TWallet = { initialization: { orderId: 'SYNTHETIC_ORDER', clientToken: undefined }, onSubmit: async () => pair };",
  ],
];
const fixturePath = (name: string) => path.join(__dirname, `__consumer_${name}.tsx`);
let diagnostics: readonly ts.Diagnostic[];

beforeAll(() => {
  const config = ts.readConfigFile(path.join(root, 'tsconfig.json'), ts.sys.readFile);
  if (config.error)
    throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  const options: ts.CompilerOptions = {
    ...parsed.options,
    noEmit: true,
    types: ['react', 'node'],
  };
  const sources = new Map(
    [...positives, ...negatives].map(([name, body]) => [
      fixturePath(name),
      `${preamble}${body}\nconst view = <Wallet {...props} />; void view;\n`,
    ]),
  );
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile.bind(host);
  const fileExists = host.fileExists.bind(host);
  host.fileExists = (file) => sources.has(file) || fileExists(file);
  host.getSourceFile = (file, languageVersion, onError, shouldCreateNewSourceFile) => {
    const source = sources.get(file);
    return source === undefined
      ? getSourceFile(file, languageVersion, onError, shouldCreateNewSourceFile)
      : ts.createSourceFile(file, source, languageVersion, true, ts.ScriptKind.TSX);
  };
  const program = ts.createProgram(
    [...sources.keys(), path.join(root, 'src/@types/global.d.ts')],
    options,
    host,
  );
  diagnostics = ts.getPreEmitDiagnostics(program);
}, 30000);

const messages = (items: readonly ts.Diagnostic[]) =>
  items.map((item) => ts.flattenDiagnosticMessageText(item.messageText, '\n'));

it('has no compiler errors outside the consumer fixtures', () => {
  const fixtureNames = new Set([...positives, ...negatives].map(([name]) => fixturePath(name)));
  expect(
    messages(diagnostics.filter((item) => !item.file || !fixtureNames.has(item.file.fileName))),
  ).toEqual([]);
});

it.each(positives)('accepts %s', (name) => {
  expect(messages(diagnostics.filter((item) => item.file?.fileName === fixturePath(name)))).toEqual(
    [],
  );
});

it.each(negatives)('rejects %s', (name) => {
  expect(diagnostics.some((item) => item.file?.fileName === fixturePath(name))).toBe(true);
});
