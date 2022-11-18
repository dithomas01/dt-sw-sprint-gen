import svelte from 'rollup-plugin-svelte';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import path from 'path'

const production = !process.env.ROLLUP_WATCH;

const themeOptions = {
	sourceMap: !production,
	defaults: {script: 'typescript', style: 'scss'},
	scss: {
		includePaths: ['src/theme' ]
	},
	postcss: {
		minimize: true,
		inject: false,
		use: [
			[
				'sass',
				{
					includePaths: ['./src', '.src/theme', './node_modules'],
				},
			],
		],
		plugins: [
		]
	}
}

const includeWebComponents = {
	emitCss: false,
	include: /\.component\.svelte$/,
	compilerOptions: {
		customElement: true,
		dev: !production,
		css: true,
	},
	preprocess: sveltePreprocess(themeOptions),
}

const excludeWebComponents = {
	emitCss: false,
	exclude: /\.component\.svelte$/,
	compilerOptions: {
		customElement: false,
		dev: !production,
		css: true,
	},
	preprocess: sveltePreprocess(themeOptions),
}

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		alias({
			resolve: ['.svelte', '.ts', 'js'],
			entries: [
				{ find: '@assets', replacement: path.resolve(__dirname, 'src/assets/') },
				{ find: '@components', replacement: path.resolve(__dirname, 'src/components/') },
				{ find: '@services', replacement: path.resolve(__dirname, 'src/services/') },
			]
		}),
		svelte(includeWebComponents),
		svelte(excludeWebComponents),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
