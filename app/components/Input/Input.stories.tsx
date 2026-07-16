import type { Meta, StoryObj } from "@storybook/react-vite";
import Input from "./Input";

const meta = {
	title: "Components/Input",
	component: Input,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Email",
		id: "email",
		type: "email",
		placeholder: "reke@rekenett.no",
	},
};

export const WithError: Story = {
	args: {
		label: "Email",
		id: "email",
		type: "email",
		placeholder: "reke@rekenett.no",
		error: { type: "pattern", message: "Enter a valid email" },
	},
};
