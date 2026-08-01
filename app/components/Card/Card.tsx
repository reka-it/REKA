import Pattern from "../Pattern/Pattern";
import styles from "./Card.module.scss";
import { useMemo } from "react";

type CardProps = {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	bgtype?: "normal" | "pattern" | "image";
	src?: string;
	alt?: string;
	patternColor?: string;
	patternOpacity?: number;
};

export default function Card({
	children,
	className = "",
	style,
	bgtype = "normal",
	src,
	alt,
	patternColor = "#fff",
	patternOpacity = 0.3,
}: CardProps) {
	const offset = 10;
	const { ox, oy } = useMemo(() => ({ ox: Math.random() * offset * 2 - offset, oy: Math.random() * offset * 2 - offset }), [bgtype]);

	return (
		<div className={`${styles.card} ${className}`} style={style}>
			{bgtype === "pattern" &&
				<Pattern smallest={7} largest={7} spacing={20} opacity={patternOpacity} color={patternColor} offsetY={oy} offsetX={ox} />
			}
			{bgtype === "image" &&
				<img src={src} className={styles.image} alt={alt}/>
			}
			{children}
		</div>
	);
}
