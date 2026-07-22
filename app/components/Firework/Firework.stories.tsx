import type { Meta, StoryObj } from "@storybook/react-vite";
import Firework from "./Firework";

export default {
	title: "Components/Firework",
	component: Firework,
	parameters: { layout: "centered" },
	args: {},
} satisfies Meta<typeof Firework>;

type Story = StoryObj<typeof Firework>;

export const Default: Story = {
	render: (args) => <Firework {...args} />,
};
