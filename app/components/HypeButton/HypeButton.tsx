import styles from "./HypeButton.module.scss";
import { updateUserHypeCount, upsertHype } from "~/firebase/firestore";
import { useHypeCounter } from "~/firebase/useHypeCounter";
import { useAuth } from "~/firebase/useAuth";
import Button from "../Button/Button";

type HypeButtonProps = {
	className?: string;
};

export default function HypeButton({ className }: HypeButtonProps) {
	const { account } = useAuth()
	const { hype, loading } = useHypeCounter();

	const onClick = () => {
		upsertHype()
		updateUserHypeCount(account)
	}

	return (
		<Button className={styles.hype} onClick={onClick} styling="centralized">
			<span className={styles.counter}>
				{hype ? hype : ":("}
			</span>
		</Button>
	);
}
