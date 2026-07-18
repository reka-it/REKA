import type { Meta, StoryObj } from "@storybook/react-vite";
import Input from "./Input";

export default {
	title: "Components/Input",
	component: Input,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {
		label: "Email",
		id: "email",
		type: "email",
		placeholder: "reke@rekenett.no",
	},
	render: (args) => <Input {...args} />,
};

export const WithError: Story = {
	args: {
		label: "Email",
		id: "email",
		type: "email",
		placeholder: "reke@rekenett.no",
		error: { type: "pattern", message: "Enter a valid email" },
	},
	render: (args) => <Input {...args} />,
};
