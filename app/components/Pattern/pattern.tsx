import { useEffect, useRef } from "react";
import styles from "./pattern.module.scss";

type PatternProps = {
	smallest: number,
	largest: number,
	spacing: number,
	offsetX?: number,
	offsetY?: number,
};

export default function Pattern({ smallest, largest, spacing, offsetX = 0, offsetY = 0 }: PatternProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const outerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const outer = outerRef.current;
		if (!canvas || !outer) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const draw = () => {
			const width = outer.clientWidth;
			const height = outer.clientHeight;
			canvas.width = width;
			canvas.height = height;

			ctx.clearRect(0, 0, width, height);

			const cols = Math.max(1, Math.floor(width / spacing));
			const rows = Math.max(1, Math.ceil(height / spacing));

			for (let row = -1; row <= rows; row++) {
				for (let col = -1; col <= cols; col++) {
					const x = col * spacing + spacing / 2 + offsetX;
					const y = row * spacing + spacing / 2 + offsetY;
					const t = Math.max(0, Math.min(1, col / Math.max(cols - 1, 1)));
					const radius = (largest - smallest) * t + smallest;

					ctx.beginPath();
					ctx.arc(x, y, radius, 0, Math.PI * 2);

					ctx.fillStyle = "#00ff99";
					ctx.fill();
				}
			}
		};

		draw();

		const resizeObserver = new ResizeObserver(draw);
		resizeObserver.observe(outer);
		return () => resizeObserver.disconnect();
	}, []);

	return (
		<div className={styles.outer} ref={outerRef}>
			<canvas
				className={styles.pattern}
				ref={canvasRef}
			/>
		</div>
	);
}
