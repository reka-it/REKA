import type { Meta, StoryObj } from "@storybook/react-vite";
import Navbar from "./Navbar";

export default {
	title: "Components/Navbar",
	component: Navbar,
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof Navbar>;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
	render: (args) => <Navbar {...args} />,
};
