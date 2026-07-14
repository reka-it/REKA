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

export default function AuthPage() {
	const navigate = useNavigate();

	return (
		<Page className={styles.content}>
			<div className={styles.authSection}>
				<Auth onSucsess={() => goBack(navigate)} />
			</div>
		</Page>
	);
}
