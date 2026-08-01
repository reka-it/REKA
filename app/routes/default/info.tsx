import styles from "../../styles/info.module.scss";
import { getRandomMeanings } from "~/firebase/firestore";
import type { Route } from "./+types/info";
import { useAuth } from "~/firebase/useAuth";

export async function loader() {
        const meanings = await getRandomMeanings(18);
        return {meanings}
}

export default function Info({loaderData} : Route.ComponentProps) {
    const { user, hasAccess } = useAuth();
    return (
        <>
            <h1 className={styles.Title}>Hva betyr REKA for deg?</h1>
            <h6 className={styles.Register}>{(!hasAccess("user") ? "( Registrer deg for å vise hva REKA betyr for deg! )" : "")}</h6>
            <div className={styles.MeaningWrapper}>
                {Array.isArray(loaderData.meanings) && loaderData.meanings.length > 0 ? (
                    loaderData.meanings.map((m: any) => (
                        <div className={styles.meaning} key={m.id}>{m.message}</div>
                    ))
                ) : (
                    <p>Ingen betydninger er lagt til ennå.</p>
                )}
            </div>
        </>
    );
}