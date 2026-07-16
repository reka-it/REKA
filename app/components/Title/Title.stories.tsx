import type { Meta, StoryObj } from "@storybook/react-vite";
import Title from "./Title";

const meta = {
	title: "Components/Title",
	component: Title,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Summer of '69",
	},
};
