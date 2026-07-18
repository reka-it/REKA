import type { Meta, StoryObj } from "@storybook/react-vite";
import Card from "./Card";

export default {
	title: "Components/Card",
	component: Card,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
	args: {
		children: "UwU",
		style: { width: "200px", height: "200px" },
	},
	render: (args) => <Card {...args} />,
};
