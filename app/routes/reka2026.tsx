import type { Route } from "./+types/home";
import Page from "~/components/Page/Page";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

export default function Home() {
	//Add suspense component for loading state
	return (
		<>
			<Page>
				<h1>REKA 26!!!!!!</h1>	
			</Page>	
		</>
	);
}
