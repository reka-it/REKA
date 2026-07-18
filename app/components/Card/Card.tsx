import styles from "./Card.module.scss";

type CardProps = {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
};

export default function Card({
	children,
	className = "",
	style,
}: CardProps) {
	return (
		<div className={`${styles.card} ${className}`} style={style}>
			{children}
		</div>
	);
}
