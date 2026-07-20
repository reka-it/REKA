import { type RouteConfig, index, route, prefix, layout } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	...prefix("reka", [
		route("2026", "routes/reka/reka2026.tsx"),
		route(":slug", "routes/reka/ingenReka.tsx"),
	]),
	...prefix("admin", [
		layout("routes/admin/adminLayout.tsx", [
			index("routes/admin/index.tsx"),
			route("users", "routes/admin/users.tsx"),
			route("styling", "routes/admin/styling.tsx"),
			route("rekaer", "routes/admin/rekaer.tsx"),
		]),
	]),
	route("auth", "routes/auth.tsx"),
	route("earlier", "routes/earlier.tsx"),
	route("feedback", "routes/feedback.tsx"),
	route("*", "routes/notFound.tsx"),
] satisfies RouteConfig;
