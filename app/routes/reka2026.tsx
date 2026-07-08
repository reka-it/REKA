import Navbar from "~/components/navbar/navbar";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "Reka" }];
}

export default function Home() {
	return (
		<>
			<Navbar />
			<h1>Reka 2026</h1>
		</>
	);
}
