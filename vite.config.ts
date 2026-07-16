/// <reference types="vitest/config" />
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	plugins: [
		...(process.env.STORYBOOK ? [] : [reactRouter()]),
	],
	server: {
		port: 3000
	},
	resolve: {
		tsconfigPaths: true
	},
	css: {
		preprocessorOptions: {
			scss: {
				loadPaths: ["app"]
			}
		}
	},
	test: {
		projects: [{
			extends: true,
			plugins: [
				storybookTest({
					configDir: path.join(dirname, '.storybook')
				})],
			test: {
				name: 'storybook',
				browser: {
					enabled: true,
					headless: true,
					provider: playwright({}),
					instances: [{
						browser: 'chromium'
					}]
				}
			}
		}]
	}
});
