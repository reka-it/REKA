import type { Meta, StoryObj } from "@storybook/react-vite";
import Page from "./Page";

export default {
	title: "Components/Page",
	component: Page,
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof Page>;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
	args: {
		children: <p>Page content</p>,
	},
	render: (args) => <Page {...args} />,
};
