import type { Meta, StoryObj } from "@storybook/react-vite";
import Textarea from "./Textarea";

export default {
	title: "Components/Textarea",
	component: Textarea,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
	args: {
		label: "Textarea",
		id: "idfk",
		placeholder: "write here!",
	},
	render: (args) => <Textarea {...args} />,
};

export const WithError: Story = {
	args: {
		label: "Textarea",
		id: "idfk",
		placeholder: "write here!",
		error: { type: "pattern", message: "Too long idk" },
	},
	render: (args) => <Textarea {...args} />,
};
