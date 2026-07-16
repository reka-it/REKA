import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import AuthModal from "./AuthModal";
import Button from "../Button/Button";

const meta = {
	title: "Components/AuthModal",
	component: AuthModal,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	args: {
		open: true,
		setOpen: fn(),
	},
} satisfies Meta<typeof AuthModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(true);
		return (
			<>
				<Button type="button" onClick={() => setOpen(true)}>Open auth</Button>
				<AuthModal open={open} setOpen={setOpen} />
			</>
		);
	},
};
