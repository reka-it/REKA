import type { Route } from "./+types/reka2026";
import Page from "~/components/Page/Page";
import Button from "~/components/Button/Button";
import { useAuth } from "~/firebase/useAuth";
import Pattern from "~/components/Pattern/Pattern";
import Card from "~/components/Card/Card"
import Title from "~/components/Title/Title"
import HypeButton from "~/components/HypeButton/HypeButton";
import styles from '~/styles/reka2026.module.scss'
import GrainOverlay from "~/components/GrainOverlay/GrainOverlay";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

export default function Home() {
	const { user, hasAccess } = useAuth();
	//Add suspense component for loading state
	//Kartet e utdatert, men me har ikke et nytt kart for nå og det e samme sted
	return (
		<>
			<GrainOverlay intensity={0.4}/>
			<Page navBarClassName={styles.navBar} className={styles.page}>
				<Title className={styles.title}>Summer of '69</Title>
				<Card className={styles.map} bgtype="image" src="/map.png"></Card>
				<div className={`${styles.cardWrapper} ${hasAccess("admin") ? styles.visibleLines : ""}`}>
					<Card className={styles.info} bgtype="normal">
						<h2>Litt basic info type shit</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</Card>
					<Card className={styles.insta}bgtype="pattern">
						<h2>Instagram</h2>
						<p>Følg oss på instagram for å holde deg oppdatert!</p>
						<Button onClick={() => { window.location.href = "https://www.instagram.com/reka_offisiell/"}}>Følg oss!</Button>
					</Card>
					<Card className={styles.hype}>
						<h2>Hype knapp!!!</h2>
						<h5>Trykk på knappen for å vise hypen din!
							(Trenger en redesign)
						</h5>
						<HypeButton/>
					</Card>
					<Card className={styles.countdown}>
						<h3>Countdown type shi</h3>
					</Card>
					<Card className={styles.program}>
						<h2>Nice å ha en komponent her kanskje? (Program)</h2>
					</Card>
				</div>
			</Page >
		</>
	);
}
