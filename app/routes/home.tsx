import { redirect } from "react-router";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "Reka" }];
}

export function loader() {
	if (new Date().getFullYear() === 2026) {
		throw redirect("/2026");
	}
	return null;
}

// ekspoter ikke noe html siden den redirecter til 2026 før noe html blir lastet
