import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	"stories": [
		"../app/**/*.mdx",
		"../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"
	],
	"addons": [
		"@chromatic-com/storybook",
		"@storybook/addon-vitest",
		"@storybook/addon-a11y",
		"@storybook/addon-docs",
		"@storybook/addon-onboarding"
	],
	"framework": "@storybook/react-vite",
	async viteFinal(config) { // ai bug fix, i ain't got a clue xD
		return {
			...config,
			plugins: config.plugins?.filter((plugin) => {
				const name = (plugin as any)?.name;
				return name !== 'react-router' && name !== 'react-router-vite-plugin';
			}),
		};
	},
};
export default config;
