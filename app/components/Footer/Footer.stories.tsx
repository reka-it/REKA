import type { Meta, StoryObj } from "@storybook/react-vite";
import Footer from "./Footer";

export default {
	title: "Components/Footer",
	component: Footer,
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof Footer>;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
	render: (args) => <Footer {...args} />,
};
