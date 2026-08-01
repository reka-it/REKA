import type { Route } from "./+types/notFound";
import styles from "../../styles/notFound.module.scss";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

export default function Home() {
	return (
		<>
			<h1 className={styles.error}>ERROR NOT FOUND 404</h1>
			<h4 className={styles.subheading}>Hmmm, ser ikke ut som denne siden finnes.
				<br/>Hvis du mener det er en feil, vennligst kontakt din nærmeste REKA-WEEB
			</h4>
		</>
	);
}
