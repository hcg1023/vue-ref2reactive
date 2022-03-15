/// <reference types="vitest" />
/// <reference types="vitest/globals" />
import { defineConfig } from 'vite'
import * as path from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		dts({
			// outputDir: path.resolve(__dirname, '/dist'),
		}),
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, './src/main.ts'),
			formats: ['cjs', 'es'],
			fileName: format => `${format}/index.js`,
		},
		rollupOptions: {
			external: ['vue', 'vue-demi'],
		},
	},
	resolve: {
		alias: {
		},
	},
	test: {
		environment: 'jsdom',
		globals: true,
	},
})
