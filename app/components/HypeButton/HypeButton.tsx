import { useEffect, useState } from "react";
import styles from "./HypeButton.module.scss";
import { updateUserHypeCount, upsertHype } from "~/firebase/firestore";
import { useHypeCounter } from "~/firebase/useHypeCounter";
import { useAuth } from "~/firebase/useAuth";

type HypeButtonProps = {
	className?: string;
};

export default function HypeButton({className}: HypeButtonProps) {
	const { account } = useAuth()
	const { data, loading } = useHypeCounter();

	const onClick = () => {
		upsertHype()
		updateUserHypeCount(account)
	}

	return (
		<button className={`${styles.hype} ${className}`} onClick={onClick}>
			<span className={styles.counter}>
				{data && data.hype}
			</span>
		</button>
	);
}
