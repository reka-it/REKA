<<<<<<< HEAD
import Navbar from "~/components/Navbar/navbar";
=======
import Navbar from "~/components/Navbar/Navbar";
>>>>>>> refs/remotes/origin/v2
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
