import { useEffect, useState } from "react";
import styles from "./HypeButton.module.scss";
import { upsertHype } from "~/firebase/firestore";
import { useHypeCounter } from "~/firebase/useHypeCounter";

type HypeButtonProps = {
};

export default function HypeButton({ }: HypeButtonProps) {
	const { data, loading } = useHypeCounter();

	useEffect(() => {

	}, [])

	return (
		<button className={styles.hype} onClick={() => upsertHype()}>
			<span className={styles.counter}>
				{data && data.hype}
			</span>
		</button>
	);
}
