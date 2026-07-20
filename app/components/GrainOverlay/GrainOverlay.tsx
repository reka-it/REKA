import styles from "./GrainOverlay.module.scss";

export default function GrainOverlay({ intensity = 0.8 }: { intensity?: number }) {
	return (
		<svg
			className={styles.grain}
			viewBox="0 0 1000 1000"
			preserveAspectRatio="none"
			style={{ opacity: intensity }}
		>
			<filter id="noiseFilter">
				<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
				<feColorMatrix type="saturate" values="0" />
				<feComponentTransfer>
					<feFuncA type="gamma" exponent="3" amplitude="1.2" offset="0" />
				</feComponentTransfer>
			</filter>
			<rect width="100%" height="100%" filter="url(#noiseFilter)" />
		</svg>
	);
}
