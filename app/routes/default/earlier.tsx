import Card from "~/components/Card/Card";
import type { Route } from "../+types/earlier";
import Page from "~/components/Page/Page";
import styles from "~/styles/earlier.module.scss";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

export default function Earlier() {
	return (
		<>
			<h1 className={styles.title}>
					REKAs historie
			</h1>
			<h5 className={styles.subtitle}>(Vi legger til mer her etterhvert)</h5>
			<div className={styles.cardWrapper}>
				<Card bgtype="image" src="/REKA_25.JPEG" alt="REKA-25" className={styles.REKA25}>2025</Card>
				<Card bgtype="image" src="/REKA_24.jpeg" alt="REKA-24" className={styles.REKA24}>2024</Card>
				<Card bgtype="image" src="/reka-logo-basic-padded.svg" alt="REKA-23" className={styles.REKA23}>2023 <br/> <span>(Pls send oss gruppebildet hvis du har det)</span></Card>
				<Card bgtype="image" src="/REKA_22.jpg" alt="REKA-22" className={styles.REKA22}>2022</Card>
				<Card bgtype="image" src="/reka-logo-basic-padded.svg" alt="REKA-21" className={styles.REKA21}>2021 <br/> <span>(Pls send oss gruppebildet hvis du har det)</span></Card>
				<Card bgtype="image" src="/REKA_1912.jpg" alt="REKA-1912" className={styles.REKA1912}>1912</Card>
			</div>
		</>
	);
}
