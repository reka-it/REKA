import { useParams } from "react-router";
import type { Route } from "./+types/ingenReka";
import Page from "~/components/Page/Page";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

export default function IngenReka() {
	const { slug } = useParams();

	return (
		<>
			<Page><h1>Det var ingen REKA i {slug}</h1></Page>
		</>
	);
}
