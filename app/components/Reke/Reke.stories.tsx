import type { Meta, StoryObj } from "@storybook/react-vite";
import styles from "./Reke.module.scss";
import Reke from "./Reke";

export default {
	title: "Components/RekeText",
	component: Reke,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Reke>;

type Story = StoryObj<typeof Reke>;

export const Default: Story = {
	render: (_) => <span className={styles.storybook}> Dette er <Reke>REKA</Reke> Woooo </span>
};
