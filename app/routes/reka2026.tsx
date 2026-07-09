import type { Route } from "./+types/home";
import Page from "~/components/Page/Page";
import Pattern from "~/components/Pattern/Pattern";
import constants from "~/constants.module.scss";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

export default function Home() {
	//Add suspense component for loading state
	return (
		<>
			<Page>
				<div style={{ position: "absolute", left: "50px", bottom: "200px", rotate: "-30deg", width: "20rem", height: "7rem", clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 60%)", overflow: "hidden", fill: "red" }}>
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
					/>
				</div>
				<div style={{ border: "2px white solid", background: constants.greenDark, width: "20rem", height: "13rem", position: "relative", margin: "10px" }}>
					<Pattern
						smallest={5}
						largest={5}
						spacing={20}
						offsetX={-2}
						offsetY={0}
						color={constants.green}
						opacity={0.5}
					/>
				</div>
				<span style={{ border: "2px white solid", background: constants.greenDark, padding: "10px", position: "relative", width: "fit-content", color: "white", margin: "10px" }}>
					<span> Hello </span>
					<Pattern
						smallest={2}
						largest={2}
						spacing={10}
						color={constants.green}
						opacity={0.2}
					/>
				</span>
				<h1>REKA 26!!!!!!</h1>
			</Page>
		</>
	);
}
