import type { Meta, StoryObj } from "@storybook/react-vite";
import HypeButton from "./HypeButton";

export default {
	title: "Components/HypeButton",
	component: HypeButton,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof HypeButton>;

type Story = StoryObj<typeof HypeButton>;

export const Default: Story = {
	render: (args) => <HypeButton {...args} />,
};
