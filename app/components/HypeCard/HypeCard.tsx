import styles from "./HypeCard.module.scss";
import Card from "../Card/Card";
import HypeButton from "../HypeButton/HypeButton";

type HypeCardProps = {
	className?: string;
};

export default function HypeCard({ className }: HypeCardProps) {
	return (
		<Card className={`${styles.hype} ${className}`}>
			<HypeButton />
			<h2>Hype knapp!!!</h2>
			<h5>Trykk på knappen for å vise hypen din!
				(Trenger en redesign)
			</h5>
		</Card>

	);
}
