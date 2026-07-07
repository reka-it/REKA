import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "Reka" }];
}

export default function Home() {
	return <>Reka 2026</>;
}
