import styles from "./HypeCard.module.scss";
import Card from "../Card/Card";
import HypeButton from "../HypeButton/HypeButton";
import { useHypeCounter } from "~/firebase/useHypeCounter";

type HypeCardProps = {
	className?: string;
};

type Milestone = {
	name: string,
	goal: number,
}

export default function HypeCard({ className }: HypeCardProps) {
	const { hype, loading } = useHypeCounter();
	const milstones: Array<Milestone> = [
		{ name: "vises ikke cuz we passed that shit", goal: 1000 },
		{ name: "reka program relase", goal: 3000 },
		{ name: "suprise", goal: 6000 },
		{ name: "vi bygger en til hytte", goal: 70030 },
	].sort((a, b) => a.goal - b.goal);

	return (
		<Card className={`${styles.hype} ${className}`}>
			Hype button tm
			<HypeButton />
			<ul className={styles.milestones}>
				{!loading && hype !== null &&
					milstones.map((milestone) => {
						if (milestone.goal <= hype) {
							return <></>
						}
						return <li className={styles.milestone}>
							<span className={styles.name}>{milestone.name}</span>
							<span>---</span>
							<span>{milestone.goal}</span>
						</li >
					})
				}
			</ul>
		</Card>

	);
}
