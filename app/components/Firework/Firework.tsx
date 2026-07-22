import { useEffect, useMemo } from "react";
import styles from "./Firework.module.scss";
import { createPortal } from "react-dom";

type FireworkProps = {
	active: boolean;
	setActive: (v: boolean) => void;
};

function randInt(range: number): number {
	return Math.floor(Math.random() * range);
}

export default function Firework({ active, setActive }: FireworkProps) {
	const length = 30;

	const gradients = useMemo<string>(() => {
		if (!active) return "";
		return Array.from({ length }).map((_) => (`radial-gradient(circle, red 10px, #0000 0)`)).join(",")
	}, [active])

	const positions = useMemo<string>(() => {
		if (!active) return "";
		return Array.from({ length }).map((_) => (`${randInt(100)}% ${randInt(100)}%`)).join(",")
	}, [active])

	useEffect(() => {
		if (!active) return;

		setTimeout(() => {
			setActive(false)
		}, 2000)
	}, [active])

	return createPortal(<div
		className={active ? styles.firework : ""}
		style={{ backgroundImage: gradients, backgroundPosition: positions }}
	/>,
		document.body
	)
}
