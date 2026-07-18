import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";

export default {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	args: {
		children: "Button",
		type: "button",
	},
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
	render: (args) => <Button {...args} />,
};

export const Disabled: Story = {
	args: {
        disabled: true,
        styling: "standard"
    },
	render: (args) => <Button {...args} />,
};
