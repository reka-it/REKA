import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/auth";
import Page from "~/components/Page/Page";
import Auth from "~/components/Auth/Auth";
import { goBack, useAuth } from "~/firebase/useAuth";
import styles from "~/styles/auth.module.scss";
import { loggedIn } from "~/firebase/auth";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA AUTH" }];
}

// throws you back before html load if you are logged in, still flashes tho
// also maybe set to go back one page instead of yearly reka
export async function clientLoader() {
	if (await loggedIn()) {
		throw redirect(`/`);
	}
}

export default function AuthPage() {
	useAuth("guest")
	const navigate = useNavigate();

	return (
		<Page className={styles.content}>
			<Auth onSucsess={() => goBack(navigate)} />
		</Page>
	);
}
