import type { Meta, StoryObj } from "@storybook/react-vite";
import Pattern from "./Pattern";

export default {
	title: "Components/Pattern",
	component: Pattern,
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof Pattern>;

type Story = StoryObj<typeof Pattern>;

export const Default: Story = {
	args: {
		smallest: 5,
		largest: 12,
		spacing: 40,
	},
	render: (args) => (
		<div style={{ position: "relative", height: "400px" }}>
			<Pattern {...args} />
		</div>
	),
};
