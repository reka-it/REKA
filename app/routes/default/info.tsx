import styles from "../../styles/info.module.scss";
import { getRandomMeanings } from "~/firebase/firestore";
import type { Route } from "./+types/info";
import { useAuth } from "~/firebase/useAuth";
import Textbox from "~/components/Textbox/Textbox";
import Reke from "~/components/Reke/Reke";

export async function clientLoader() {
	const meanings = await getRandomMeanings(28);
	return { meanings }
}

export default function Info({ loaderData }: Route.ComponentProps) {
	const { user, hasAccess } = useAuth();
	return (
		<>
			<div className={styles.InfoWrapper}>
				<h1 className={styles.Title}>Hva betyr <Reke>REKA</Reke> for deg?</h1>
				<h5 className={styles.Register}>{(!hasAccess("user") ? "( Registrer deg for å vise hva REKA betyr for deg! )" : "")}</h5>
				<div className={styles.MeaningWrapper}>
					{Array.isArray(loaderData.meanings) && loaderData.meanings.length > 0 ? (
						loaderData.meanings.map((m: any) => (
							<Textbox key={m.id}>{m.message}</Textbox>
						))
					) : (
						<p>Ingen betydninger er lagt til ennå.</p>
					)}
				</div>
			</div>
		</>
	);
}
