import styles from "./GrainOverlay.module.scss";

export default function GrainOverlay() {
	return (
		<svg
			className={styles.grain}
			viewBox="0 0 1000 1000"
			preserveAspectRatio="none"
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
