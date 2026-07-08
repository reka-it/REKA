import type { Route } from "./+types/home";
import Page from "~/components/Page/Page";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

export default function Home() {
	//Add suspense component for loading state
	return (
		<>
			<Navbar />
			<h1>Reka 2026</h1>
			<div style={{ position: "absolute", left: "50px", bottom: "200px", rotate: "-30deg", width: "20rem", height: "7rem", clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 60%)", overflow: "hidden" }}>
				<Pattern
					smallest={1}
					largest={6}
					spacing={10}
					offsetX={5}
					offsetY={5}
				/>
			</div>
			<div style={{ position: "absolute", right: "50px", bottom: "200px", rotate: "200deg", width: "20rem", height: "7rem", clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 60%)", overflow: "hidden" }}>
				<Pattern
					smallest={1}
					largest={6}
					spacing={10}
					offsetX={5}
					offsetY={5}
				/>
			</div>
			<Page>
				<h1>REKA 26!!!!!!</h1>	
			</Page>	
		</>
	);
}
