import Navbar from "~/components/Navbar/navbar";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

export default function Home() {
	return (
		<>
			<Navbar />
			<h1>Admin</h1>
		</>
	);
}
