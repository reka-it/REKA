import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DropDown from "./DropDown";
import Button from "../Button/Button";

export default {
	title: "Components/DropDown",
	component: DropDown,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof DropDown>;

type Story = StoryObj<typeof DropDown>;

export const Default: Story = {
	args: {
		items: ["Option 1", "Option 2", "Option 3"],
	},
	render: (args) => {
		const [selected, setSelected] = useState(0);
		const [open, setOpen] = useState(false)
		const anchor = useRef(null)

		return (
			<div style={{ position: "relative" }}>
				<Button ref={anchor} onClick={() => setOpen(v => !v)}>Toggle</Button>
				<DropDown {...args}
					anchorRef={anchor}
					open={open}
					setOpen={setOpen}
					selected={selected}
					onSelect={(_, index) => setSelected(index)}
				/>
			</div>
		);
	},
};
