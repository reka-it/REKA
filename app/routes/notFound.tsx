import type { Route } from "./+types/notFound";
import Page from "~/components/Page/Page";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

export default function Home() {
	return (
		<>
			<Page><h1>Trokke den siden eksisterer ennå</h1></Page>
		</>
	);
}
