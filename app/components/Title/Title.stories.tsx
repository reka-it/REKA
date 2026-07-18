import type { Meta, StoryObj } from "@storybook/react-vite";
import Title from "./Title";

export default {
	title: "Components/Title",
	component: Title,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Title>;

type Story = StoryObj<typeof Title>;

export const Default: Story = {
	args: {
		children: "Summer of '69",
	},
	render: (args) => <Title {...args} />,
};
