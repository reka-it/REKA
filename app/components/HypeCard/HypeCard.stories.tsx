import type { Meta, StoryObj } from "@storybook/react-vite";
import HypeCard from "./HypeCard";

export default {
	title: "Components/HypeCard",
	component: HypeCard,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof HypeCard>;

type Story = StoryObj<typeof HypeCard>;

export const Default: Story = {
	render: (args) => <HypeCard {...args} />,
};
