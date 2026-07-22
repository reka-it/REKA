import type { Meta, StoryObj } from "@storybook/react-vite";
import Firework from "./Firework";
import Button from "../Button/Button";
import { useState } from "storybook/internal/preview-api";

export default {
	title: "Components/Firework",
	component: Firework,
	parameters: { layout: "centered" },
} satisfies Meta<typeof Firework>;

type Story = StoryObj<typeof Firework>;

export const Default: Story = {
	render: (_) => {
		const [active, setActive] = useState(false);
		return (
			<>
				<Button onClick={() => setActive(true)}> Trigger </Button>
				<Firework active={active} setActive={setActive} />
			</>
		)
	}
};
