import type { Route } from "./+types/admin";
import Page from "~/components/Page/Page";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

export default function Home() {
	return (
		<>
			<Page><h1>Admin</h1></Page>
		</>
	);
}
