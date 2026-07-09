import type { Route } from "./+types/home";
import Page from "~/components/Page/Page";
import Pattern from "~/components/Pattern/Pattern";
import Title from "~/components/Title/Title"
import HypeButton from "~/components/HypeButton/HypeButton";
import constants from "~/constants.module.scss";
import styles from '../styles/reka2026.module.scss'

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

export default function Home() {
	//Add suspense component for loading state
	return (
		<>
			<Page className={styles.page}>
				<Title className={styles.title}>Summer of '69</Title>
				<div className={styles.triangleLeft}>
					<Pattern
						smallest={1}
						largest={6}
						spacing={10}
						offsetX={5}
						offsetY={5}
					/>
				</div>
				<div className={styles.triangleRight}>
					<Pattern
						smallest={1}
						largest={6}
						spacing={10}
					/>
				</div>
				<div className={styles.panel}>
					<Pattern
						smallest={5}
						largest={5}
						spacing={20}
						offsetX={-2}
						offsetY={0}
						color={constants.green}
						opacity={0.5}
					/>
				</div>
				<span className={styles.tag}>
					<span> Summer of 69 </span>
					<Pattern
						smallest={2}
						largest={2}
						spacing={10}
						color={constants.green}
						opacity={0.2}
					/>
				</span>
				<HypeButton />
			</Page>
		</>
	);
}
