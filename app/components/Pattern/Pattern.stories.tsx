import type { Meta, StoryObj } from "@storybook/react-vite";
import Pattern from "./Pattern";

const meta = {
	title: "Components/Pattern",
	component: Pattern,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ position: "relative", width: "100%", height: "400px" }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Pattern>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		smallest: 5,
		largest: 12,
		spacing: 40,
	},
};
