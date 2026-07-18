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
		const ref = useRef<HTMLElement>(null)
		return (
			<div style={{ position: "relative" }}>
				<Button ref={ref}>Toggle</Button>
				<DropDown {...args} toggler={ref} />
			</div>
		);
	},
};
