import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Auth from "./Auth";

const meta = {
	title: "Components/Auth",
	component: Auth,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		onSucsess: fn(),
	},
} satisfies Meta<typeof Auth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
