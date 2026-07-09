import styles from "./HypeButton.module.scss";

type HypeButtonProps = {
};

export default function Button({ }: HypeButtonProps) {
	return (
		<button className={styles.hype}>
			<span>Hype</span>
		</button>
	);
}
