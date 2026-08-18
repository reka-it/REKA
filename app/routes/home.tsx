import { redirect } from "react-router";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

export function clientLoader() {
	//throw redirect(`/reka/${new Date().getFullYear()}`);
}

export default function Home() {
	return (<div>uwu</div>)
}

// ekspoter ikke noe html siden den redirecter til årets reka før noe html blir lastet
