import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser'; 	

export default [
	{
		input: 'src/index.ts',
		output: {
            name: 'MercadoPagoSDKReact',
			file: './dist/index-rollup.js',
			format: 'umd'
		},
		plugins: [
			resolve(), 
			commonjs(),
			typescript(),
			terser()
		]
	}
];