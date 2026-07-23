import { useEffect, useMemo, useState } from "react";
import styles from "./Firework.module.scss";
import { createPortal } from "react-dom";
import useMousePosition from "~/hooks/useMousePosition";

type FireworkProps = {
	active: boolean;
	setActive: (v: boolean) => void;
};

function randInt(range: number, minimum: number = 0): number {
	return Math.floor(Math.random() * range) + minimum;
}

export const COLORS = [
	"#ff3b30",
	"#ff9500",
	"#ffcc00",
	"#34c759",
	"#00c7be",
	"#30b0ff",
	"#5e5ce6",
	"#af52de",
	"#ff2d95",
] as const;

export default function Firework({ active, setActive }: FireworkProps) {
	const { x, y } = useMousePosition();
	const length = 30;

	const gradients = useMemo<string>(() => {
		if (!active) return "";
		return Array.from({ length }).map((_) => (`radial-gradient(circle, ${COLORS[randInt(COLORS.length)]} ${randInt(5, 2)}px, #0000 0)`)).join(",")
	}, [active])

	const bgpositions = useMemo<string>(() => {
		if (!active) return "";
		return Array.from({ length }).map((_) => (`${randInt(100)}% ${randInt(100)}%`)).join(",")
	}, [active])

	return createPortal(<div
		className={active ? styles.firework : ""}
		style={{ top: y, left: x, backgroundImage: gradients, backgroundPosition: bgpositions }}
	/>,
		document.body
	)
}
