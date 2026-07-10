import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	...prefix("reka", [
		route("2026", "routes/reka/reka2026.tsx"),
		route(":slug", "routes/reka/ingenReka.tsx"),
	]),
	route("admin", "routes/admin.tsx"),
	route("earlier", "routes/earlier.tsx"),
	route("*", "routes/notFound.tsx"),
] satisfies RouteConfig;
