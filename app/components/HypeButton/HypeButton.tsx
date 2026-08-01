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
	const { data, loading } = useHypeCounter();

	const onClick = () => {
		upsertHype()
		updateUserHypeCount(account)
	}

	return (
		<Button className={styles.hype} onClick={onClick} styling="centralized" disabled={false}>
			<span className={styles.counter}>
				{account ? data ? data.hype : ":(" : "Login to hype"}
			</span>
		</Button>
	);
}
