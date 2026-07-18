import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import AuthModal from "./AuthModal";
import Button from "../Button/Button";

export default {
	title: "Components/AuthModal",
	component: AuthModal,
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof AuthModal>;

type Story = StoryObj<typeof AuthModal>;

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(true);
		return (
			<div style={{ padding: "20px" }}>
				<Button type="button" onClick={() => setOpen(true)}>Open auth</Button>
				<AuthModal open={open} setOpen={setOpen} />
			</div>
		);
	},
};
