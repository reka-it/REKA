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
		children: "This is a card wow",
		style: { width: "200px", height: "200px" },
		bgtype: "normal"
	},
	render: (args) => <Card {...args} />,
};

export const Pattern: Story = {
	args: {
		children: "This is a card wow",
		style: { width: "200px", height: "200px" },
		bgtype: "pattern",
	},
	render: (args) => <Card {...args} />,
};

export const Image: Story = {
	args: {
		children: "This is a card wow",
		style: { width: "200px", height: "200px" },
		bgtype: "image",
		src: "/public/map.png",
	},
	render: (args) => <Card {...args} />,
};
