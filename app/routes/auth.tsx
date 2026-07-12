import { useNavigate } from "react-router";
import type { Route } from "./+types/auth";
import Page from "~/components/Page/Page";
import Auth from "~/components/Auth/Auth";
import { useAuth, goBack } from "~/firebase/useAuth";
import styles from "./auth.module.scss";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA AUTH" }];
}

export default function AuthPage() {
	const navigate = useNavigate();
	useAuth("guest");

	return (
		<Page className={styles.content}>
			<Auth onSucsess={() => goBack(navigate)} />
		</Page>
	);
}
