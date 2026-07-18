import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";

export default {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: "Button",
		type: "button",
	},
	render: (args) => <Button {...args} />,
};
