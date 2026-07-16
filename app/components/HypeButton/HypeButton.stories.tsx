import type { Meta, StoryObj } from "@storybook/react-vite";
import HypeButton from "./HypeButton";

const meta = {
	title: "Components/HypeButton",
	component: HypeButton,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof HypeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
