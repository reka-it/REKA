import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Modal from "./Modal";
import Button from "../Button/Button";

export default {
	title: "Components/Modal",
	component: Modal,
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof Modal>;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(true);
		return (
			<div style={{ padding: "20px" }}>
				<Button type="button" onClick={() => setOpen(true)}>Open modal</Button>
				<Modal open={open} setOpen={setOpen}>
					<p style={{ width: "50vw", height: "50vh" }}>Modal content</p>
				</Modal>
			</div>
		);
	},
};
