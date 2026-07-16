import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import DropDown from "./DropDown";
import Button from "../Button/Button";

const meta = {
	title: "Components/DropDown",
	component: DropDown,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		open: true,
		setOpen: fn(),
		items: ["Option 1", "Option 2", "Option 3"],
		onSelect: fn(),
	},
} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [open, setOpen] = useState(false);
		return (
			<div style={{ padding: "20px", position: "relative" }}>
				<Button type="button" onClick={() => setOpen(true)}>Toggle</Button>
				<DropDown {...args} open={open} setOpen={setOpen} />
			</div>
		);
	},
};
