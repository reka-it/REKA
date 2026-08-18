import type { Meta, StoryObj } from "@storybook/react-vite";
import Program from "./Program";
import styles from "./HypeCard.module.scss"

export default {
	title: "Components/Program",
	component: Program,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Program>;

type Story = StoryObj<typeof Program>;

export const Default: Story = {
	render: (args) => <Program {...args} className={`${styles.storybook}`} />,
};
