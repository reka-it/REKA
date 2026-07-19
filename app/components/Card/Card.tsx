import Pattern from "../Pattern/Pattern";
import styles from "./Card.module.scss";

type CardProps = {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	bgtype?: "normal" | "pattern" | "image";
	src?: string;
};

export default function Card({
	children,
	className = "",
	style,
	bgtype = "normal",
	src,
}: CardProps) {
	return (
		<div className={`${styles.card} ${className}`} style={style}>
			{bgtype === "pattern" &&
				<Pattern smallest={7} largest={7} spacing={20} opacity={0.3} color="pink" offsetY={-5} offsetX={-5} />
			}
			{bgtype === "image" &&
				<img src={src} className={styles.image} />
			}
			{children}
		</div>
	);
}
