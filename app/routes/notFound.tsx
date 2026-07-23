import type { Route } from "./+types/notFound";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

export default function Home() {
	return (
		<>
			<h1>Trokke den siden eksisterer ennå</h1>
		</>
	);
}
