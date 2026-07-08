import Navbar from "~/components/Navbar/Navbar";
import type { Route } from "./+types/home";
import Page from "~/components/Page/Page";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

export default function Home() {
	return (
		<>
			<Page><h1>Liste over tidligere REKA feiringer</h1></Page>
		</>
	);
}
