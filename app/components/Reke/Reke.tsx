import styles from "./Reke.module.scss";

type RekeProps = {
	children?: React.ReactNode;
};

export default function Reke({
	children,
}: RekeProps) {
	return (
		<span className={`${styles.reke}`}>
			{children}
		</span>
	);
}
