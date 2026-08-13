import styles from "./Program.module.scss";
import Card from "../Card/Card";

type HypeCardProps = {
	className?: string;
};

type Milestone = {
	name: string,
	goal: number,
}

export default function HypeCard({ className }: HypeCardProps) {
	const milstones: Array<Milestone> = [
		{ name: "vises ikke cuz we passed that shit", goal: 1000 },
		{ name: "reka program relase", goal: 3000 },
		{ name: "suprise", goal: 6000 },
		{ name: "vi bygger en til hytte", goal: 70030 },
	].sort((a, b) => a.goal - b.goal);

	return (
		<Card className={`${styles.program} ${className}`}>

		</Card>

	);
}
