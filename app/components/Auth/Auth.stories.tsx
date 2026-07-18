import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Auth from "./Auth";

export default {
	title: "Components/Auth",
	component: Auth,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Auth>;

type Story = StoryObj<typeof Auth>;

export const Default: Story = {
	args: {
		onSucsess: fn(),
	},
	render: (args) => <Auth {...args} />,
};
