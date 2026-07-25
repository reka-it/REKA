import type { Meta, StoryObj } from "@storybook/react-vite";
import Countdown from "./Countdown";

export default {
	title: "Components/Countdown",
	component: Countdown,
	parameters: {
		layout: "centered",
	},
	args: {
		targetDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60 * 3 + 1000 * 60 * 5 + 1000 * 2),
	},
} satisfies Meta<typeof Countdown>;

type Story = StoryObj<typeof Countdown>;

export const Default: Story = {
	render: (args) => <Countdown {...args} />,
};
