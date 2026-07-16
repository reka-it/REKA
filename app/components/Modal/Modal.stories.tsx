import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Modal from "./Modal";
import Button from "../Button/Button";

const meta = {
	title: "Components/Modal",
	component: Modal,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	args: {
		open: true,
		setOpen: fn(),
	},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

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
