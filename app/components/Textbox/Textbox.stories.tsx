import type { Meta, StoryObj } from "@storybook/react-vite";
import Textbox from "./Textbox";

export default {
	title: "Components/Textbox",
	component: Textbox,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Textbox>;

type Story = StoryObj<typeof Textbox>;

export const Default: Story = {
	args: {
		children: "text inside the textbox",
	},
	render: (args) => <Textbox {...args} />,
};
