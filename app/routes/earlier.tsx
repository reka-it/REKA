import Card from "~/components/Card/Card";
import type { Route } from "./+types/earlier";
import Page from "~/components/Page/Page";
import styles from "~/styles/earlier.module.scss";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

export default function Home() {
	return (
		<>
			<h1 className={styles.title}>
					REKAs historie
				</h1>
				<div className={styles.cardWrapper}>
					<Card bgtype="image" src="/REKA_25.JPEG" className={styles.REKA25}>2025</Card>
					<Card bgtype="image" src="/REKA_24.jpeg" className={styles.REKA24}>2024</Card>
					<Card bgtype="image" src="/reka-logo-basic-padded.svg" className={styles.REKA23}>2023 <br/> <span>(Pls send oss gruppebildet hvis du har det)</span></Card>
					<Card bgtype="image" src="/REKA_22.jpg" className={styles.REKA22}>2022</Card>
					<Card bgtype="image" src="/reka-logo-basic-padded.svg" className={styles.REKA21}>2021 <br/> <span>(Pls send oss gruppebildet hvis du har det)</span></Card>
					<Card bgtype="image" src="/REKA_1912.jpg" className={styles.REKA1912}>1912</Card>
				</div>
		</>
	);
}
